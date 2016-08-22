import {BuildUtil} from "../router/build.util";
import {HttpMethod} from "../router/http.method";

import * as path from "path";
import * as Promise from "bluebird";
import * as fs from "fs";

export function tester(appFile: string) {
  let resolve = (url: string, method: HttpMethod, event?: any) => {
    let name = BuildUtil.getLauncherName(url, method);
    let wrapperModule = path.join(BuildUtil.getBuildDirectory(), name);

    return new Promise((resolve) => {
        fs.exists(wrapperModule, (exists) => {
          resolve(exists);
        });
      })
      .then(exist => {
        if(!exist) throw new Error("404");

        var launcher = require(wrapperModule);
        return Promise.fromCallback(callback => {
          launcher.index(event, {}, callback);
        });
      });
  };

  return {
    get: (url: string, query?: any) => {
      return resolve(url, "GET", query);
    },
    post: (url: string, data?: any) => {
      return resolve(url, "POST", data);
    },
    put: (url: string, data?: any) => {
      return resolve(url, "PUT", data);
    },
    delete: (url: string, query?: any) => {
      return resolve(url, "DELETE", query);
    }
  }
}