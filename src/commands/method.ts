import Promise = require("bluebird");
import store = require("../data/key.value.store");
import _ = require("lodash");
import {HttpMethod} from "../router/http.method";
import {putMethod, getMethod} from "../aws/apiGateway/method";

import app = require("./app");
import resource = require("./resource");

export function create(apiName: string, url: string, method: HttpMethod) {
  return get(apiName, url, method)
    .then(res => {
      if(!res) {
        return app.get(apiName).then(app => {
          return resource.create(apiName, url)
            .then(res => {
              return putMethod({
                restApiId: app.awsRestApi,
                resourceId: res.id,
                httpMethod: method,
                authorizationType: "NONE"
              });
            });
        });
      }

      return res;
    });
}

export function get(apiName: string, url: string, method: HttpMethod) {
  return resource
    .get(apiName, url)
    .then(res => {
      if(!res) return Promise.resolve(null);

      return app
        .get(apiName)
        .then(app => {
          return getMethod({
            restApiId: app.awsRestApi,
            resourceId: res.id,
            httpMethod: method
          });
        });
    });
}