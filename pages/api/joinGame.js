import { MongoClient } from 'mongodb';

async function Handler(req, res) {
  try {
    const data = req.body.data;
    console.log(data);

    const client = await MongoClient.connect(process.env.MONGO_DB);

    //TODO: STEP 1: Here we need to verify the room code exists in the database, the game is still in the pending
    //   status before we can let the player join the room. If the room does not exist, throw an error and

    // STEP 2:

    res.status(201).json({
      message: 'Here is your game data!',
      playerRegistered,
    });
  } catch (error) {
    //either the roomcode was not found or some other error
    console.log(error);
    res.status(404).json({
      message:
        'The room code provided does not exists. Please double check your room code and try again.',
    });
  }
}
