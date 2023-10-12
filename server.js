const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const {getPaspardleData, storeUserScore, getNarmastVinnerData, getLeaderboardData} = require('./server/mongodb')
var bodyParser = require('body-parser')

const app = express();


app.use("/", express.static(path.join(__dirname, "public")));

const { PORT = 5001 } = process.env;
let server;


var jsonParser = bodyParser.json();

function startServer() {
  server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

function stopServer() {
  if (server) {
    server.close(() => {
      console.log('Server stopped');
    });
  }
}

process.on('SIGINT', () => {
  console.log('SIGINT signal received.');
  stopServer();
  process.exit();
});

app.get("/api/test", (req, res) => {
  res.json({
    project: "På Spårdle",
    by: "Adam & Paul",
  });
});

app.get("/get_paspardle", async (req,res) => {
  try{
    const answer = await getPaspardleData();
    res.json(answer);  
  }catch{
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post("/store_score", jsonParser, async (req,res) => {
  try{
    console.log("I server.js")
    
    const points = req.body.points;
    const time = req.body.time;
    const round = req.body.round;
    const userName = req.body.userName;
    const answer = await storeUserScore(points,time,round,userName);
    res.json(answer);
  }catch(error){
    console.log(error);
  }
});

app.get("/get_narmastvinner", async (req,res) => {
  try{
    const answer = await getNarmastVinnerData();
    res.json(answer);  
  }catch{
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.get("/get_leaderboard", async (req,res) => {
  try{
    const answer = await getLeaderboardData();
    res.json(answer);  
  }catch{
    res.status(500).json({ error: 'Internal server error' });
  }

});

startServer();