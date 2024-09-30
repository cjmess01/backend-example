// Express API to set up web server
const express = require("express");
const app = express();
const port = 3000;

// CFB API Setup
const cfb = require("cfb.js");
const defaultClient = cfb.ApiClient.instance;
const ApiKeyAuth = defaultClient.authentications["ApiKeyAuth"];
ApiKeyAuth.apiKey =
  "Bearer K6yJb6pJ3pglZYpyhwuFV2vO3hUyjwcHBF2UU1mcguq24PYVamIO2oZepz/Bittr";
const api = new cfb.TeamsApi();

// Opens port for connections
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Serves a route to the browser
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Serves a route to the browser, with a dynamic url parameter
app.get("/name/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Your name is ${name}`);
});

// Serves a route to browser with TWO url parameters
app.get("/matchup/:team1/:team2", (req, res) => {
  const team1 = req.params.team1;
  const team2 = req.params.team2;
  const opts = {};

  api.getTeamMatchup(team1, team2, opts).then(
    function (data) {
      res.send(
        `Overall record is ${data.team1Wins} - ${data.team2Wins} - ${data.ties}`,
      );
    },
    function (error) {
      console.error(error);
    },
  );
});
