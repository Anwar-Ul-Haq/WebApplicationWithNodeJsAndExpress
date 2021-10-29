const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');



const sessionsRouter = express.Router();

sessionsRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://dbUser:rXqzbdZlEvcHhkCV@cluster0.dwhvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const sessions = await db.collection('sessions').find().toArray();

      res.render('sessions', { sessions });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});



module.exports = sessionsRouter;
