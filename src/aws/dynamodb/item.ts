import {AWS} from "../aws";
import * as Promise from "bluebird";
import {DynamoDB} from "aws-sdk";

//const endpoint = new AWS.Endpoint('localhost');
const dynamo = new AWS.DynamoDB(/*{ endpoint: endpoint }*/);

export function putItem(params: DynamoDB.PutItemInput) {
  return Promise.fromCallback(callback => {
    return dynamo.putItem(params, callback);
  });
}

export function deleteItem(params: DynamoDB.DeleteItemInput) {
  return Promise.fromCallback(callback => {
    return dynamo.deleteItem(params, callback);
  });
}

export function updateItem(params: DynamoDB.UpdateItemInput) {
  return Promise.fromCallback(callback => {
    return dynamo.updateItem(params, callback);
  });
}

export function getItem(params: DynamoDB.GetItemInput) {
  return Promise.fromCallback(callback => {
    return dynamo.getItem(params, callback);
  });
}

export function scan(params: DynamoDB.ScanInput) {
  return Promise.fromCallback(callback => {
    return dynamo.scan(params, callback);
  });
}