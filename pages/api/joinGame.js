import { MongoClient, ObjectId } from 'mongodb';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';

async function handler(req, res) {
  try {
    if (req.method !== 'PATCH') throw new Error('Method not supported');

    const data = req.body;
    const { roomCode, newPlayer } = data;

    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();
    const gameCollection = db.collection('secret_hitler');

    //TODO: Make sure that there is no duplicate named player
    //TODO: Make sure the game is not in play (inProgress should be false)

    console.log(roomCode);
    const updatedCollection = await gameCollection.updateOne(
      { _id: ObjectId(roomCode) },
      {
        $push: {
          players: {
            id: generateRoomWithoutSeparator(),
            name: newPlayer,
            role: null,
          },
        },
      }
    );

    client.close();

    if (updatedCollection.matchedCount === 0)
      throw new Error('The room code provided does not exists.');

    res.status(201).json({
      message: 'Player added successfully',
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message: err.message,
    });
  }
}

export default handler;
