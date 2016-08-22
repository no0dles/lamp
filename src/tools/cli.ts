import * as path from "path";
import {build} from "./build";
import {RoutingUtil} from "../router/routing.util";
import {Lamb} from "../lamb";
import {BuildUtil} from "../router/build.util";

function cli() {
  if(process.argv.length < 3) {
    return console.log("Please pass your app.js");
  }

  let appPath = path.join(process.cwd(), process.argv[2]);
  let app = require(appPath) as Lamb;

  let routeNodes = RoutingUtil.getRouteTree(app.route);

  for(let routeNode of routeNodes) {

    let name = BuildUtil.getName(routeNode.url, routeNode.method);

    build({
      inputFile: appPath,
      outputDirectory: BuildUtil.getBuildDirectory(),
      name: name,
      url: routeNode.url,
      method: routeNode.method,
      release: true
    }).then(() => {
      console.log(`built ${name} successfully`);
    }).catch(err => {
      console.log(err);
    });
  }

}

cli();