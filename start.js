require("babel-core/register")({
    presets: ["es2015-node6", "react"],
    plugins: [
        "transform-class-properties"
    ]
});

module.exports = require('./app/server');
