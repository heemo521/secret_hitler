import { MongoClient } from 'mongodb';
// import { uri } from '../../components/tempENV';

// API for creating a new game

async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;

      // need the game creator's id
      const { gameMaster, roomCode } = data;

      console.log(roomCode, gameMaster);

      const client = await MongoClient.connect(process.env.MONGODB);

      const db = client.db();

      const gameCollection = db.collection('secret_hitler');

      const result = await gameCollection.insertOne({ gameMaster, roomCode });

      client.close();

      console.log(result);

      res.status(201).json({
        message: 'New game created!',
      });
    }
  } catch (err) {
    console.log(err);
  }
}

//TODO: A function to generate random Game name and hash table for active game name
// list of table names pre generated
export default handler;
