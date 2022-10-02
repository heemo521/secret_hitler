import dbConnect from '../../../utils/dbConnect';
import Game from '../../../models/game';

dbConnect();

async function handler(req, res) {
  const { method, body: data } = req;

  switch (method) {
    case 'POST':
      try {
        const { host } = data;
        const players = [{ name: host }];
        const game = await Game.create({ host, players });

        res.status(201).json({
          success: true,
          message: 'Success',
          data: { roomCode: game.id },
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
