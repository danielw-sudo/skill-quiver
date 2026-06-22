#!/usr/bin/env node
'use strict';

const { run } = require('../lib/commands.js');

run(process.argv.slice(2)).catch(err => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
