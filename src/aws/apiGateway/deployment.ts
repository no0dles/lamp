import {AWS} from "./../aws";
import * as Promise from "bluebird";
import {APIGateway} from "aws-sdk";

const gateway = new AWS.APIGateway();

export function getDeployment(params: APIGateway.GetDeploymentRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getDeployment(params, callback);
  });
}

export function getDeployments(params: APIGateway.GetDeploymentsRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getDeployments(params, callback);
  });
}

export function updateDeployment(params: APIGateway.UpdateDeploymentRequest) {
  return Promise.fromCallback(callback => {
    return gateway.updateDeployment(params, callback);
  });
}

export function createDeployment(params: APIGateway.CreateDeploymentRequest) {
  return Promise.fromCallback(callback => {
    return gateway.createDeployment(params, callback);
  });
}

export function deleteDeployment(params: APIGateway.DeleteDeploymentRequest) {
  return Promise.fromCallback(callback => {
    return gateway.deleteDeployment(params, callback);
  });
}