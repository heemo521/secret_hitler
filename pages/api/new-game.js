import { MongoClient } from 'mongodb';
import { SecretTwo } from '../../public/secret2.jpg';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';
// import { uri } from '../../components/tempENV';

// API for creating a new game
async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;

      // need the game creator's id
      const { userName } = data;
      const title = generateRoomWithoutSeparator();

      // TODO: check if the gameCode exists in the database and create it

      const client = await MongoClient.connect(process.env.MONGO_DB);

      const db = client.db();

      const gameCollection = db.collection('secret_hitler');
      // {
      //   id: 0, //url to the game
      //   gameType: 'secret_hitler', // separate game logic for separation of concerns and possible future integration of other board games
      //   title: 'dummy', //title of the game

      //   description: lorem, //description of the game if any
      //   players: players,
      //   image: SecretTwo,
      //   maxPlayers: 10, //min 5 players and max 10 players
      // },
      const result = await gameCollection.insertOne({
        userName,
        title,
        image: SecretTwo,
        description:
          'Lorem ipsum dolor sit amet, consectet unde omnis, sed do eiusmod tempor incididunt ut labore  et dolore magna aliqua.',
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

//TODO: A function to generate random Game name and hash table for active game name
// list of table names pre generated
export default handler;
