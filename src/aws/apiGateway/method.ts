import {AWS} from "./../aws";
import * as Promise from "bluebird";
import {APIGateway} from "aws-sdk";

const gateway = new AWS.APIGateway();

export function deleteMethod(params: APIGateway.DeleteMethodRequest) {
  return Promise.fromCallback(callback => {
    return gateway.deleteMethod(params, callback);
  });
}

export function putMethod(params: APIGateway.PutMethodRequest) {
  return Promise.fromCallback(callback => {
    return gateway.putMethod(params, callback);
  });
}

export function updateMethod(params: APIGateway.UpdateMethodRequest) {
  return Promise.fromCallback(callback => {
    return gateway.updateMethod(params, callback);
  });
}

export function getMethod(params: APIGateway.GetMethodRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getMethod(params, callback);
  });
}