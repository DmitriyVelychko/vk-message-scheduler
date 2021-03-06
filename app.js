'use strict';
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
const passport = require('koa-passport');
const koa = require('koa');
const GraphqlHTTP = require('koa-graphql');
const path = require('path');
const app = module.exports = koa();

const schema = require('./backend/schema/schema');

// Logger
app.use(logger());

app.use(mount('/graphql', GraphqlHTTP({
  schema: schema,
  graphiql: true
})));

// Serve static files
app.use(mount('/', serve(path.join(__dirname, '/backend/public'))));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
