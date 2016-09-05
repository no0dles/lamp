import {HttpMethod} from "../router/http.method";
import {BuildUtil} from "../router/build.util";
import {Lamb} from "../lamb";
import {RoutingUtil} from "../router/routing.util";

const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');
const Promise = require("bluebird");
const webpack = require("webpack");
const Zip = require('node-zip');

const BUILD_DIR = BuildUtil.getBuildDirectory();
const TEMPLATE_DIR = path.join(__dirname, "../templates");

interface IBuildContext {
  inputFile: string;
  outputDirectory: string;
  name: string;
  url: string;
  method: HttpMethod;
  release: boolean;
}

export function clean() {
  logMessage(`clean build directory`);
  return Promise.fromCallback(callback => {
    fs.readdir(BUILD_DIR, callback);
  }).then(files => {
    return Promise.all(files.map(file => {
      return Promise.fromCallback(callback => {
        fs.unlink(path.join(BUILD_DIR, file), callback);
      });
    }));
  })
}

function getTemplate(templateName: string) {
  return readFile(TEMPLATE_DIR, templateName);
}

function renderTemplate(templateName: string, data: { [key: string]: string }) {
  return getTemplate(templateName).then(template => {
    for(let key in data) {
      template = template.replace(`{{${key}}}`, data[key]);
    }

    return template;
  });
}

function readFile(directory: string, fileName: string) {
  return Promise.fromCallback(callback => {
    fs.readFile(path.join(directory, fileName), "UTF-8", callback);
  });
}

function writeFile(directory: string, fileName: string, content: string, encoding?: string) {
  let file = path.join(directory, fileName);
  return Promise.fromCallback(callback => {
    fs.writeFile(file, content, { encoding: encoding }, callback);
  });
}

function createDirectory(directory: string) {
  logMessage("create build directory");
  return Promise.fromCallback(callback => {
    mkdirp(directory, callback);
  });
}

function logMessage(message: string) {
  console.log(`[*] ${message}`);
}

function buildWrapper(context: IBuildContext) {
  return renderTemplate("wrapper.js", {
    app: context.inputFile,
    url: context.url,
    method: context.method
  })
    .then(template => {
      return writeFile(
        context.outputDirectory,
        BuildUtil.getWrapperName(context.url, context.method),
        template
      );
    });
}

function buildBundle(context: IBuildContext) {
  return Promise.fromCallback(callback => {
    let config = {
      entry: path.join(context.outputDirectory, BuildUtil.getWrapperName(context.url, context.method)),
      output: {
        path: context.outputDirectory,
        filename: BuildUtil.getBundleName(context.url, context.method)
      },
      externals: {
        "aws-sdk": "aws.sdk"
      },
      plugins: [],
      target: "node"
    };

    if(context.release) {
      config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      );
    }

    webpack(config, callback);
  });
}

function buildLauncher(context: IBuildContext) {
  return renderTemplate("entrypoint.js", {
    "bundle": `./${BuildUtil.getBundleName(context.url, context.method)}`
  }).then(template => {
    return writeFile(
      context.outputDirectory,
      BuildUtil.getLauncherName(context.url, context.method),
      template
    );
  });
}

function buildZip(context: IBuildContext) {
  let zip = new Zip();

  let files = [
    BuildUtil.getBundleName(context.url, context.method),
    BuildUtil.getWrapperName(context.url, context.method),
    BuildUtil.getLauncherName(context.url, context.method)
  ];

  return Promise.all(files.map(file => {
    return readFile(context.outputDirectory, file).then(data => {
      zip.file(file, data);
    });
  })).then(() => {
    let data = zip.generate({
      base64:false,
      compression:'DEFLATE'
    });

    return writeFile(
      context.outputDirectory,
      BuildUtil.getZipName(context.url, context.method),
      data,
      'binary'
    );
  });
}


export function app(appPath: string, release: boolean) {
  logMessage(`start build for ${release ? "release " : ""}${appPath}`);

  let app = require(appPath) as Lamb;
  let routeNodes = RoutingUtil.getRouteTree(app.route);

  let promiseChain = createDirectory(BUILD_DIR)
    .then(() => clean());

  for(let routeNode of routeNodes) {

    let name = BuildUtil.getName(routeNode.url, routeNode.method);
    let context = {
      inputFile: appPath,
      outputDirectory: BUILD_DIR,
      name: name,
      url: routeNode.url,
      method: routeNode.method,
      release: release
    };

    promiseChain.then(() => {
      logMessage(`building ${routeNode.method} ${routeNode.url}`);

      return buildWrapper(context)
        .then(() => buildBundle(context))
        .then(() => buildLauncher(context))
        .then(() => buildZip(context));
    });
  }

  return promiseChain;
}
