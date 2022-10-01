import { MongoClient, ObjectId } from 'mongodb';
// start the game by changing the inProgress to true and it should
// turn back to false once the game is finished

async function handler(req, res) {
  try {
    if (req.method !== 'PATCH') throw new Error('Method not supported');

    const numOfFascists = {
      5: 1,
      6: 1,
      7: 2,
      8: 2,
      9: 3,
      10: 3,
    };

    const data = req.body;
    const { roomCode } = data;

    const client = await MongoClient.connect(process.env.MONGO_DB);
    const db = client.db();
    const gameCollection = db.collection('secret_hitler');

    const gameData = await gameCollection
      .find({ _id: ObjectId(roomCode) })
      .toArray();

    const { players } = gameData;
    let numOfFascistsLeft = numOfFascists[players.length];

    const generateRandomNumber = () =>
      Math.floor(Math.random() * players.length);

    const updatedPlayersRole = players.map((player) => {
      console.log(player.role);
    });

    // we should update the players here
    const updatedCollection = await gameCollection.updateOne(
      { _id: ObjectId(roomCode) },
      {
        $set: { inProgress: true, players },
      }
    );

    client.close();
    // iterate through the players and assign roles as the game starts;

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
