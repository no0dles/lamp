import Promise = require("bluebird");
import store = require("../data/key.value.store");
import fs = require("fs");
import path = require("path");
import _ = require("lodash");
import {HttpMethod} from "../router/http.method";
import {putIntegration} from "../aws/apiGateway/integration";

import app = require("./app");
import resource = require("./resource");
import methodCmd = require("./method");

const TEMPLATE_DIR = path.join(__dirname, "../templates");

export function create(apiName: string, url: string, method: HttpMethod) {
  return app.get(apiName).then(app => {
    return resource.create(apiName, url)
      .then(res => {
        return methodCmd.create(apiName, url, method)
          .then(() => {
            return putIntegration({
              restApiId: app.awsRestApi,
              resourceId: res.id,
              httpMethod: method,
              integrationHttpMethod: method,
              credentials: "arn:aws:iam::099878639587:role/service-role/node",
              type: "AWS",
              uri: "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:099878639587:function:app-GET/invocations",
              requestTemplates: {
                "application/json": fs.readFileSync(path.join(TEMPLATE_DIR, "requestTemplate.txt"), "UTF-8")
              },
              passthroughBehavior: "NEVER"
            });
          });
      });
  });
}