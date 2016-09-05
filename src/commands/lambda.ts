import Promise = require("bluebird");
import store = require("../data/key.value.store");
import path = require("path");
import fs = require("fs");
import {createFunction} from "../aws/lambda";
import {BuildUtil} from "../router/build.util";

const BUILD_DIR = BuildUtil.getBuildDirectory();


export function create(name: string) {
  return createFunction({
    FunctionName: name,
    Runtime: "nodejs4.3",
    Role: "arn:aws:iam::099878639587:role/service-role/node",
    Handler: `${name}.index`,
    Code: {
      ZipFile: fs.readFileSync(path.join(BUILD_DIR, `${name}.zip`), {flag : "r"})
    }
  });
}