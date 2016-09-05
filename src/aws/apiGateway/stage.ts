import {AWS} from "./../aws";
import * as Promise from "bluebird";
import {APIGateway} from "aws-sdk";

const gateway = new AWS.APIGateway();

export function createStage(params: APIGateway.CreateStageRequest) {
  return Promise.fromCallback(callback => {
    return gateway.createStage(params, callback);
  });
}

export function getStage(params: APIGateway.GetStageRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getStage(params, callback);
  });
}

export function getStages(params: APIGateway.GetStagesRequest) {
  return Promise.fromCallback(callback => {
    return gateway.getStages(params, callback);
  });
}

export function deleteStage(params: APIGateway.DeleteStageRequest) {
  return Promise.fromCallback(callback => {
    return gateway.deleteStage(params, callback);
  });
}

export function updateStage(params: APIGateway.UpdateStageRequest) {
  return Promise.fromCallback(callback => {
    return gateway.updateStage(params, callback);
  });
}