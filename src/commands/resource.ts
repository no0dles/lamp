import Promise = require("bluebird");
import store = require("../data/key.value.store");
import {createResource, getResources} from "../aws/apiGateway/resource";
import {PathUtil} from "../router/path.util";
import _ = require("lodash");

const app = require("./app");
const resourceDb = store.get<IAppResource>("resource");

interface IAppResource {
  awsRestApi: string;
  awsResource: string;
  parentId: string;
  path: string;
  pathPart: string;
}

export function create(apiName: string, path: string) {

  return app.get(apiName)
    .then(app => {
      return list(apiName)
        .then((resources:ResourceItem[]) => {

          let root = _.find(resources, route => route.path === "/");
          let parts = PathUtil.getParts(path);

          let next = (index: number, url: string, resource: ResourceItem) => {
            index++;

            if(index >= parts.length)
              return Promise.resolve<ResourceItem>(resource);

            return create(index, url, resource.id);
          };

          let create = (index: number, url: string, parentId: string) => {
            url += "/" + parts[index];

            let resource = _.find(resources, resource => resource.path === url);

            if (resource)
              return next(index, url, resource);

            return createResource({
              restApiId: app.awsRestApi,
              parentId: parentId,
              pathPart: parts[index]
            }).then(res => {
              return resourceDb.put(url, {
                awsRestApi: app.awsRestApi,
                awsResource: res.id,
                parentId: res.parentId,
                pathPart: res.pathPart,
                path: res.path
              }).then(() => next(index, url, res));
            });
          };

          return create(0, "", root.id);
        });
    });
}

export interface ResourceItem {
  id: string,
  parentId: string,
  path: string,
  pathPart: string
}

export function list(apiName: string): Promise<ResourceItem[]> {
  return app.get(apiName).then(app => {
    return getResources({
      restApiId: app.awsRestApi
    }).then(data => {
      return data["items"] as ResourceItem[];
    });
  });
}


export function get(apiName: string, url: string) {
  return list(apiName)
    .then(resources => _.find<ResourceItem>(resources, resource => resource.path === url));
}