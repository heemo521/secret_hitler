import { MongoClient } from 'mongodb';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';

async function handler(req, res) {
  try {
    if (req.method !== 'POST') throw new Error('Method not supported');
    const data = req.body;
    const { host } = data;
    const roomName = generateRoomWithoutSeparator();

    //TODO: Have one connection for all the requests
    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();
    const gameCollection = db.collection('secret_hitler');

    //TODO: Make sure there is no players with same name

    const result = await gameCollection.insertOne({
      roomName,
      host,
      players: [{ id: generateRoomWithoutSeparator(), name: host }],
      numOfCompletedRounds: 0,
      inProgress: false,
    });

    client.close();

    res.status(201).json({
      message: 'New game created!',
      roomCode: result.insertedId.toString(),
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}

export default handler;
