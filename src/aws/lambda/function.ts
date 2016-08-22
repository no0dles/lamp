var AWS = require("aws-sdk");
var fs = require("fs");
var path = require("path");

export function create(name: string, role: string, timeout: number) {
  AWS.config.update({region: 'eu-west-1'});

  var lambda = new AWS.Lambda();

  var params = {
    Code: {
      ZipFile: fs.readFileSync(path.join(process.cwd(), "tmp", `${name}.zip`))
    },
    FunctionName: name,
    Handler: `${name}_launcher.index`,
    Role: 'arn:aws:iam::099878639587:role/aws-nodejs-dev-IamRoleLambda-ADRTRN4Y7A68',
    Runtime: 'nodejs4.3',
    Description: name,
    MemorySize: 128,
    Publish: true,
    Timeout: 3
  };

  lambda.createFunction(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
