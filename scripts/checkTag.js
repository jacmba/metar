#!/usr/bin/node

'use strict';

let tag = process.argv[2];
let version = require('../package.json').version;
let exec = require('child_process').exec;
let sys = require('sys');

if(!tag || tag === '') {
  console.log('Untagged build');
  setTagVar("latest");
  process.exit(0);
}

console.log(`Checking version tagged as "${tag}"`);

if(tag !== version) {
  console.log(`Tag "${tag}" does not match version "${version}"!!`);
  process.exit(1);
}

console.log(`Verified version "${version}"`);
setTagVar(tag);
process.exit(0);

//------------------------------------------------------------------------------
function setTagVar(value) {
  let cmd = `echo ${value} > BUILD_TAG`;
  exec(cmd, setVarCb);
}

//------------------------------------------------------------------------------
function setVarCb(error, stdout, stderr) {
  if(error) {
    sys.puts(error);
    process.exit(1);
  }

  sys.puts(stdout);
  sys.puts(stderr);
}