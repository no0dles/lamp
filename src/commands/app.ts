import {createRestApi, deleteRestApi} from "../aws/apiGateway/restApi";
import Promise = require("bluebird");
import store = require("../data/key.value.store");

const appDb = store.get<IAppDocument>("app");

export interface IAppDocument {
  name: string;
  awsRestApi: string;
}

export function create(name: string) {
  return get(name).then(res => {
    if(res !== null) {
      throw new Error("App exists already");
    }

    return createRestApi({
      name: name
    }).then(res => {
      return appDb.put(name, {
        name: name,
        awsRestApi: res.id
      });
    });
  });
}

export function get(name: string) {
  return appDb.get(name)
}

export function list() {
  return appDb.list();
}

export function remove(name: string) {
  return appDb.get(name)
    .then(app => {
      return deleteRestApi({
        restApiId: app.awsRestApi
      });
    })
    .then(() => {
      console.log("Removed api");
    });
}