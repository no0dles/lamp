import {Router} from "./router/router";
import {HttpMethod} from "./router/http.method";
import {RoutingUtil} from "./router/routing.util";
import * as Promise from "bluebird";


export class Lamb extends Router {
  run(url: string, method: HttpMethod) {
    let route = RoutingUtil.getMatchingRoute(url, this.route);

    if (!route) return;

    let aws = (<any>global).aws;

    let context = {
      event: aws.event,
      context: aws.context
    };

    let callback = (err:Error, data?:any) => {
      aws.callback(err, data);
    };

    let handler = RoutingUtil.getMatchingHandlers(method, route);
    if(handler) {
      let res = handler(context, callback);
      if(res) {
        Promise.resolve(res).then(result => {
          callback(null, result);
        }).catch(err => {
          callback(err, null);
        });
      }
    }

  }
}