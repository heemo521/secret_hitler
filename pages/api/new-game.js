// API for creating a new game

function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // need the game creator's id
    const { gameMaster } = data;
  }
}
