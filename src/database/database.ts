const Promise = require("bluebird");
const AWS = require('aws-sdk');


export class Database {
  private dynamodb: any;

  constructor() {
    AWS.config.update({region: 'eu-west-1'});

    this.dynamodb = new AWS.DynamoDB();
  }

  put(table: string, item: any) {
    let params = {
      Item: { },
      TableName: table
    };

    for(let key in item) {
      params.Item[key] = { S: item[key] };
    }

    return Promise.fromCallback(callback => {
      this.dynamodb.putItem(params, callback);
    });
  }

  get(table: string, key: string) {
    let params = {
      Key: {
        id: {
          S: key
        }
      },
      TableName: table
    };

    return Promise.fromCallback(callback => {
      this.dynamodb.getItem(params, callback);
    });
  }

  del(table: string, key: string) {
    let params = {
      Key: {
        id: {
          S: key
        }
      },
      TableName: table
    };

    return Promise.fromCallback(callback => {
      this.dynamodb.deleteItem(params, callback);
    });
  }

  /*query(table: string, args: any) {
    var params = {
      TableName: table,
      ConsistentRead: false
    };

    this.dynamodb.query(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }*/

  /*scan(table: string) {
    var params = {
      TableName: table
    };

    return Promise.fromCallback(callback => {
      this.dynamodb.scan(params, callback);
    });
  }*/
}