import {AWS} from "../aws";
import * as Promise from "bluebird";
import {DynamoDB} from "aws-sdk";

const dynamo = new AWS.DynamoDB();

export function createTable(params: DynamoDB.CreateTableInput) {
  return Promise.fromCallback(callback => {
    return dynamo.createTable(params, callback);
  });
}

export function describeTable(params: DynamoDB.DescribeTableInput) {
  return Promise.fromCallback(callback => {
    return dynamo.describeTable(params, callback);
  });
}

export function deleteTable(params: DynamoDB.DeleteTableInput) {
  return Promise.fromCallback(callback => {
    return dynamo.deleteTable(params, callback);
  });
}

export function listTables(params: DynamoDB.ListTablesInput) {
  return Promise.fromCallback(callback => {
    return dynamo.listTables(params, callback);
  });
}