import {AWS} from "./../aws";
import * as Promise from "bluebird";
import {APIGateway} from "aws-sdk";

const gateway = new AWS.APIGateway();

export function putIntegration(params: APIGateway.PutIntegrationRequest) {
  return Promise.fromCallback(callback => {
    return gateway.putIntegration(params, callback);
  });
}

export function getIntegration(params: APIGateway.GetIntegrationRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getIntegration(params, callback);
  });
}

export function deleteIntegration(params: APIGateway.DeleteIntegrationRequest) {
  return Promise.fromCallback(callback => {
    return gateway.deleteIntegration(params, callback);
  });
}

export function updateIntegration(params: APIGateway.UpdateIntegrationRequest) {
  return Promise.fromCallback(callback => {
    return gateway.updateIntegration(params, callback);
  });
}