require("babel-core/register")({
    presets: ["es2015-node6", "react", "stage-1"]
});

module.exports = require('./server');
