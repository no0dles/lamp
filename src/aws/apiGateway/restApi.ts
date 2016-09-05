import {AWS} from "./../aws";
import Promise = require("bluebird");
import {APIGateway} from "aws-sdk";

const gateway = new AWS.APIGateway();

export function getRestApi(params: APIGateway.GetRestApiRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getRestApi(params, callback);
  });
}

export function getRestApis(params: APIGateway.GetRestApisRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getRestApis(params, callback);
  })
}

export function putRestApi(params: APIGateway.PutRestApiRequest) {
  return Promise.fromCallback(callback => {
    return gateway.putRestApi(params, callback);
  });
}

export function createRestApi(params: APIGateway.CreateRestApiRequest) {
  return Promise.fromCallback(callback => {
    return gateway.createRestApi(params, callback);
  });
}

export function deleteRestApi(params: APIGateway.DeleteRestApiRequest) {
  return Promise.fromCallback(callback => {
    return gateway.deleteRestApi(params, callback);
  });
}