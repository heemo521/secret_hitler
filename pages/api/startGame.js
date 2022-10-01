import { MongoClient, ObjectId } from 'mongodb';
// start the game by changing the inProgress to true and it should
// turn back to false once the game is finished

async function handler(req, res) {
  try {
    if (req.method !== 'PATCH') throw new Error('Method not supported');

    const data = req.body;
    const { roomCode } = data;

    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();
    const gameCollection = db.collection('secret_hitler');

    console.log(roomCode);
    const updatedCollection = await gameCollection.updateOne(
      { _id: ObjectId(roomCode) },
      {
        $set: { inProgress: true },
      }
    );

    client.close();

    if (updatedCollection.matchedCount === 0)
      throw new Error('The room code provided does not exists.');

    res.status(201).json({
      message: 'Game is starting!!!',
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}

export default handler;
