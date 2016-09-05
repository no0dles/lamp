#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";

const PACKAGE_PATH = "../../../package.json";
const CMD_PATH = path.join(__dirname, "../commands");

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

const program = require('commander');
const version = require(PACKAGE_PATH)["version"];

program.version(version);

function addCommand(file: string) {
  let module = require(file);

  let cmd = path.basename(file, '.js');

  for(let key in module) {
    let params = getParamNames(module[key])
      .map(param => `<${param}>`)
      .join(" ");

    program
      .command(`${cmd}:${key} ${params}`)
      .action(function() {
        let promise = module[key].apply(this, arguments);
        if(promise && promise.then) {
          promise.then(res => {
            console.log(res);
          });
        }
      });
  }
}

function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
    result = [];
  return result;
}


let files = fs.readdirSync(CMD_PATH);

for(let file of files) {
  if(path.extname(file) === ".js") {
    addCommand(path.join(CMD_PATH, file));
  }
}

program.parse(process.argv);