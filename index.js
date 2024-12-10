import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

//  Get All Games

async function fetchAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  try {
    let result = await fetchAllGames();
    if (result.games.length === 0) {
      res.status(404).json({ message: 'No such data found!' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Game by ID
async function fetchById(id) {
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.all(query, [id]);
  return { games: response };
}

app.get('/games/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchById(id);
    if (result.games.length === 0) {
      res.status(404).json({ message: 'No such file found for ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get Games by Genre
async function fetchByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchByGenre(genre);
    if (result.games.length === 0) {
      res.status(404).json({ message: 'No such data found for ' + genre });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Games by Platform
async function fetchGames(platform) {
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  try {
    let platform = req.params.platform;
    let result = await fetchGames(platform);
    if (result.games.length === 0) {
      res.status(404).json({ message: 'No such data found for ' + platform });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Games Sorted by Rating

async function fetchGameByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchGameByRating();
    if (result.games.length === 0) {
      res.status(404).json({ message: 'No such data found for ' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Players
async function fetchAllPlayers() {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/players', async (req, res) => {
  try {
    let result = await fetchAllPlayers();
    if (result.games.length === 0) {
      res.status(404).json({ message: 'No such data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Player by ID

async function fetchPlayerById(id) {
  let query = 'SELECT * FROM players WHERE id = ? ';
  let response = await db.all(query, [id]);
  return { players: response };
}

app.get('/players/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchPlayerById(id);
    if (result.players.length === 0) {
      res.status(404).json({ message: 'No such data found for ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Players by Platform

async function fetchPlayerByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  try {
    let platform = req.params.platform;
    let result = await fetchPlayerByPlatform(platform);
    if (result.players.length === 0) {
      res.status(404).json({ message: 'No such data found for ' + platform });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Players Sorted by Rating

async function fetchPlayersByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchPlayersByRating();
    if (result.players.length === 0) {
      res.status(404).json({ message: 'No such data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Tournaments

async function fetchbyTournament() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments', async (req, res) => {
  try {
    let result = await fetchbyTournament();
    if (result.tournaments.length === 0) {
      res.status(404).json({ message: 'No such data found ' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get Tournament by ID

async function fetchTournamentById(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchTournamentById(id);
    if (result.tournaments.length === 0) {
      res.status(404).json({ message: 'No such data found for ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Tournaments by Game ID

async function fetchByGameId(id) {
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/game/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await fetchByGameId(id);
    if (result.tournaments.length === 0) {
      res.status(404).json({ message: 'No such data found for ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Tournaments Sorted by Prize Pool

async function fetchByPrizePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let result = await fetchByPrizePool();
    if (result.tournaments.length === 0) {
      res.status(404).json({ message: 'No such data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
