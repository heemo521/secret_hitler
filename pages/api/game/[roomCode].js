import dbConnect from '../../../utils/dbConnect';
import Game from '../../../models/game';

dbConnect();

async function handler(req, res) {
  const {
    query: { roomCode: _id },
    method,
    body: data,
  } = req;

  switch (method) {
    // used for game status but don't need it
    case 'GET':
      try {
        res.status(201).json({
          success: true,
          message: 'Get method does nothing at the moment',
        });
      } catch (err) {
        res.status(404).json({
          success: false,
          message: err.message,
        });
      }
      break;

    case 'POST':
      try {
        const { newPlayer: name } = data;

        const gameData = await Game.updateOne(
          { _id },
          { $push: { players: { name } } }
        );

        if (!gameData) throw new Error('Invalid room code');

        res.status(201).json({
          success: true,
          message: 'Player added successfully',
        });
      } catch (err) {
        console.log(err.message);
        res.status(404).json({
          success: false,
          message: err.message,
        });
      }
      break;

    case 'PATCH':
      try {
        const { inProgress } = data;
        const gameData = await Game.findByIdAndUpdate(
          _id,
          { inProgress },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!gameData) throw new Error('Invalid room code');

        res.status(201).json({
          success: true,
          message: 'inProgress updated',
        });
      } catch (err) {
        res.status(404).json({
          success: false,
          message: err.message,
        });
      }
      break;
    default:
      res.status(404).json({
        success: false,
        message: 'Unknown method',
      });
  }
}

export default handler;
