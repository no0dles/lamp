import {AWS} from "./aws";
import {Lambda} from "aws-sdk";
import * as Promise from "bluebird";

const lambda = new AWS.Lambda();

export function createFunction(params: Lambda.CreateFunctionRequest) {
  return Promise.fromCallback(callback => {
    return lambda.createFunction(params, callback);
  });
}

export function updateFunctionCode(params: Lambda.UpdateFunctionCodeRequest) {
  return Promise.fromCallback(callback => {
    return lambda.updateFunctionCode(params, callback);
  });
}

export function updateFunctionConfiguration(params: Lambda.UpdateFunctionConfigurationRequest) {
  return Promise.fromCallback(callback => {
    return lambda.updateFunctionConfiguration(params, callback);
  });
}

export function deleteFunction(params: Lambda.DeleteFunctionRequest) {
  return Promise.fromCallback(callback => {
    return lambda.deleteFunction(params, callback);
  });
}