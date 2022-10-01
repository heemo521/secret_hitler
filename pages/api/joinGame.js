import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  try {
    if (req.method !== 'POST') throw new Error('POST request only');

    const data = req.body;
    const { roomCode, newPlayer } = data;
    console.log(roomCode, newPlayer);

    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();
    const gameCollection = db.collection('secret_hitler');

    const updatedCollection = await gameCollection.updateOne(
      { _id: ObjectId(roomCode) },
      { $push: { players: newPlayer } }
    );
    const addedCollection = await gameCollection
      .find({
        _id: ObjectId(roomCode),
      })
      .toArray();

    console.log(updatedCollection.matchedCount === 0);

    client.close();

    if (updatedCollection.matchedCount === 0)
      throw new Error('The room code provided does not exists.');

    res.status(201).json({
      message: 'Player added successfully',
    });
  } catch (error) {
    //either the roomcode was not found or some other error
    console.log(error.message);

    res.status(404).json({
      message: error.message,
    });
  }
}

export default handler;
