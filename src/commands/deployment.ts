import Promise = require("bluebird");
import store = require("../data/key.value.store");
import _ = require("lodash");
import {createDeployment} from "../aws/apiGateway/deployment";

import app = require("./app");
import resource = require("./resource");

export function create(apiName: string, stageName: string) {
  return app.get(apiName)
    .then(res => {
      return createDeployment({
        restApiId: res.awsRestApi,
        stageName: stageName
      }).then(res => {
        console.log(res);
      })
    });
}