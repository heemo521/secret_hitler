import dbConnect from '../../../utils/dbConnect';
import Game from '../../../models/game';

dbConnect();

async function handler(req, res) {
  const { query, method, body: data } = req;
  const { roomCode: _id } = query;

  switch (method) {
    case 'POST':
      try {
        const { newPlayer: name } = data;
        const gameData = await Game.findByIdAndUpdate(_id, {
          $push: { players: { name } },
        });

        if (!gameData) throw new Error('Invalid room code');

        const message = 'Player added to the game successfully';
        res.status(201).json({ success: true, message });
      } catch (err) {
        res.status(404).json({
          success: false,
          message: err.message,
        });
      }
      break;

    case 'PATCH':
      try {
        const { inProgress } = data;
        const gameData = await Game.findByIdAndUpdate(_id, { inProgress });

        if (!gameData) throw new Error('Invalid room code');

        const message = 'inProgress updated';
        res.status(201).json({ success: true, message });
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
