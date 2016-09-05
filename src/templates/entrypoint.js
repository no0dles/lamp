var sdk = require("aws-sdk");

module.exports.index = function(event, context, callback) {
  GLOBAL.aws = {
    sdk: sdk,
    event: event,
    context: context,
    callback: callback
  };

  require("{{bundle}}");
};