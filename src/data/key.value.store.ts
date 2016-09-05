import table = require("../aws/dynamodb/table");
import item = require("../aws/dynamodb/item");
import Promise = require("bluebird");

export class KeyValueStore<TValue> {
  private existsPromise: Promise<boolean>;
  private initPromise: Promise<void>;

  constructor(private name: string) {
    this.init();
  }

  init() {
    if(!this.initPromise) {
      this.initPromise = this
        .exists()
        .then(exists => {
          if(exists) return;
          return this.create();
        });
    }
    return this.initPromise;
  }

  create() {
    return table.createTable({
      AttributeDefinitions: [
        {
          AttributeName: "key",
          AttributeType: "S"
        }
      ],
      TableName: this.name,
      KeySchema: [
        {
          AttributeName: "key",
          KeyType: "HASH"
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    });
  }

  exists() {
    if(!this.existsPromise) {
      this.existsPromise = table
        .describeTable({
          TableName: this.name
        })
        .then(() => true)
        .catch(() => false);
    }
    return this.existsPromise;
  }

  put(key: string, value: TValue) {
    return this.init().then(() => item.putItem({
      TableName: this.name,
      Item: {
        key: { S: key },
        value: { S: JSON.stringify(value) }
      }
    }));
  }

  get(key: string): Promise<TValue> {
    return this.init().then(() => item.getItem({
      TableName: this.name,
      Key: {
        key: { S: key }
      }
    }).then(data => {
      if(!("Item" in data)) return null;

      return this.parse(data["Item"]);
    }));
  }

  list() {
    return this.init().then(() => item.scan({
      TableName: this.name
    }).then(data => {
      return data["Items"]
        .map(item => this.parse(item));
    }));
  }

  del(key: string) {
    return this.init().then(() => item.deleteItem({
      TableName: this.name,
      Key: {
        key: { S: key }
      }
    }));
  }

  private parse(item: any) {
    return JSON.parse(item["value"]["S"]);
  }
}

export function get<TValue>(name: string) {
  return new KeyValueStore<TValue>(name);
}