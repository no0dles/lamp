import {AWS} from "./aws";
import * as Promise from "bluebird";
import {IAM} from "aws-sdk";

const iam = new AWS.IAM();

export function createRole(params: IAM.CreateRoleRequest) {
  return Promise.fromCallback(callback => {
    return iam.createRole(params, callback);
  });
}

export function getRole(params: IAM.GetRoleRequest) {
  return Promise.fromCallback(callback => {
    return iam.getRole(params, callback);
  });
}

export function deleteRole(params: IAM.DeleteRoleRequest) {
  return Promise.fromCallback(callback => {
    return iam.deleteRole(params, callback);
  });
}