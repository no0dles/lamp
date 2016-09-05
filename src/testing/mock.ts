import {HttpMethod} from "../router/http.method";
import * as Promise from "bluebird";
import {Lamb} from "../lamb";

export class Mock {
  app: Lamb;

  constructor(appPath: string) {
    this.app = require(appPath) as Lamb;
  }

  get(url: string, query?: any) {
    return this.route(url, "GET", query);
  }

  post(url: string, data?: any) {
    return this.route(url, "POST", data);
  }

  put(url: string, data?: any) {
    return this.route(url, "PUT", data);
  }

  delete(url: string, query?: any) {
    return this.route(url, "DELETE", query);
  }

  private route(url: string, method: HttpMethod, event?: any) {
    return new Promise((resolve, reject) => {
      let aws = (<any>global).aws;

      aws.event = event;
      aws.callback = (err: Error, data?: any) => {
        if(err) return reject(err);
        resolve(data);
      };
      aws.context = {};

      this.app.run(url, method);
    });
  }
}