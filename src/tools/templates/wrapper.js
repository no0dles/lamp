var app = require("{{app}}");
try {
  app.run("{{url}}", "{{method}}");
} catch (err) {
  console.error(err);
}

