Package.describe({
  name: "davidsichau:logging",
  summary: "Logging for E.Tutorial",
  version: "0.1.0",
  git: "https://github.com/DavidSichau/meteor-logging"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  var both = ['client', 'server'];

  api.use([
    "meteor",
    "ddp",
    "sha",
    'livedata',
    "aldeed:collection2"
  ], both);


  api.addFiles("collections/log.js", both);
});






Package.onTest(function (api) {
  api.use("tinytest");
  api.use("davidsichau:logging");

  api.addFiles("tests/client/index.js", ["client"]);

});

  