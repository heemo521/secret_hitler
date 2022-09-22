import { MongoClient } from 'mongodb';
import { uri } from '../../components/tempENV';

// API for creating a new game

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // need the game creator's id
    const { gameMaster } = data;

    const client = await MongoClient.connect(uri);
    const db = client.db();

    const gameCollection = db.collection('secret_hitler');
  }
}
