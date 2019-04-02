"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb+srv://admin:Ululavit38@datingappcluster-y2wam.mongodb.net/test?retryWrites=true";

let cachedDb = null;


function connectToDatabase (uri) {

  console.log('=> connect to database');



  if (cachedDb) {

    console.log('=> using cached database instance');

    return Promise.resolve(cachedDb);

  }

  const dbName = 'dating-app';
  return MongoClient.connect(uri)
  .then(client => { cachedDb = client.db(dbName); return cachedDb; });

  // return MongoClient.connect(uri)
 
    // .then(db => {

    //   cachedDb = db;

    //   return cachedDb;

    // });

}


function queryDatabase (db) {
  console.log('=> query database');

  return db.collection('users').find({}).toArray()
    .then(() => { return { statusCode: 200, body: 'success' }; })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

module.exports.getUsers = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;


  console.log('event: ', event);

  connectToDatabase(MONGODB_URI)
    .then(db => queryDatabase(db))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};