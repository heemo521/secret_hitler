import { MongoClient } from 'mongodb';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';

async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;
      const { host } = data;
      const roomName = generateRoomWithoutSeparator();

      const client = await MongoClient.connect(process.env.MONGO_DB);
      const db = client.db();
      const gameCollection = db.collection('secret_hitler');

      const result = await gameCollection.insertOne({
        roomName,
        host,
        players: [host],
      });

      client.close();

      res.status(201).json({
        message: 'New game created!',
        roomCode: result.insertedId.toString(),
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default handler;
