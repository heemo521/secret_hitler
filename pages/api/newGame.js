import { MongoClient } from 'mongodb';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';

async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;
      const { host } = data;

      //TODO: Have one connection for all the requests
      const client = await MongoClient.connect(process.env.MONGO_DB);
      const db = client.db();
      const gameCollection = db.collection('secret_hitler');

      //TODO: Make sure there is no players with same name

      const result = await gameCollection.insertOne({
        host,
        players: [
          { id: generateRoomWithoutSeparator(), name: host, role: null },
        ],
        numOfCompletedRounds: 0,
        inProgress: false,
      });

      client.close();

      res.status(201).json({
        message: 'New game created!',
        roomCode: result.insertedId.toString(),
      });
    } else {
      throw new Error('Method not supported');
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}

export default handler;
