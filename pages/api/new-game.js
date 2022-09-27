import { MongoClient } from 'mongodb';
import { generateRoomWithoutSeparator } from '../../components/utils/roomNameGenerator';
// import { uri } from '../../components/tempENV';

// API for creating a new game

async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;

      // need the game creator's id
      const { userName } = data;
      console.log(userName);
      console.log(process.env.MONGO_DB);

      //createa a new roomn and register the userName as the game creator

      const client = await MongoClient.connect(process.env.MONGO_DB);

      const db = client.db();

      const gameCollection = db.collection('secret_hitler');

      const result = await gameCollection.insertOne({
        userName,
        generateRoomWithoutSeparator,
      });

      client.close();

      console.log(result);

      res.status(201).json({
        message: 'New game created!',
        roomCode: 'test1234',
      });
    }
  } catch (err) {
    console.log(err);
  }
}

//TODO: A function to generate random Game name and hash table for active game name
// list of table names pre generated
export default handler;
