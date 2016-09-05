import Promise = require("bluebird");
import store = require("../data/key.value.store");
import _ = require("lodash");
import {getStages} from "../aws/apiGateway/stage";

import app = require("./app");
import resource = require("./resource");

export function get(apiName: string) {
  return app.get(apiName)
    .then(res => {
      return getStages({
        restApiId: res.awsRestApi
      });
    });
}