export const AWS = require("aws-sdk");

AWS.config.update({region: 'eu-west-1'});

AWS.config.apiVersions = {
  lambda: '2015-03-31',
  apigateway: '2015-07-09',
  iam: '2010-05-08'
};