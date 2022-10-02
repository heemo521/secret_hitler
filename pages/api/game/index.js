import dbConnect from '../../../utils/dbConnect';
import Game from '../../../models/game';

dbConnect();

async function handler(req, res) {
  const { method, body: data } = req;

  switch (method) {
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
        console.log('hello');
        const { host } = data;
        const players = [{ name: host }];
        const game = await Game.create({ host, players });

        const roomCode = game._id.toString();

        res.status(201).json({
          success: true,
          message: 'Success',
          data: { roomCode },
        });
      } catch (err) {
        console.log(err.message);
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
