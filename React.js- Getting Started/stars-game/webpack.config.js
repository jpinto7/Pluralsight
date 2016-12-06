'use strict';

var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

const allowedEnvs = ['dev', 'dist'];

function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'cfg/' + validEnv));
  return config;
}

module.exports = buildConfig(argv.env);
