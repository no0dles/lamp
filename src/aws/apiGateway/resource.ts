import {AWS} from "./../aws";
import * as Promise from "bluebird";
import {APIGateway} from "aws-sdk";

const gateway = new AWS.APIGateway();

export function deleteResource(params: APIGateway.DeleteResourceRequest) {
  return Promise.fromCallback(callback => {
    return gateway.deleteResource(params, callback);
  });
}

export function createResource(params: APIGateway.CreateResourceRequest) {
  return Promise.fromCallback(callback => {
    return gateway.createResource(params, callback);
  });
}

export function getResources(params: APIGateway.GetResourcesRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getResources(params, callback);
  });
}

export function getResource(params: APIGateway.GetResourceRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getResource(params, callback);
  });
}