import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import "dotenv/config";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const base = "/api";
const baseSWAPI = process.env.SWAPI_URL;

app.get(base, (req, res) => {
  return res.status(200).json({ message: "Hello world!" });
});

app.get(`${base}/people`, (req, res) => {
  return fetch(`${baseSWAPI}/people/?page=1`)
    .then(res => res.json())
    .then(response => {
      if (!!response && response.results.length >= 5) {
        const [one, two, three, four, five] = response.results;
        return res
          .status(200)
          .json({ message: "ok", data: [one, two, three, four, five] });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong!", response });
      }
    })
    .catch(err =>
      res
        .status(400)
        .json({ message: "Oops! There's an issue with your request" }, err)
    );
});

app.set("port", 7777);
app.listen(app.get("port"), () => {
  console.log(`Listening on port... ${app.get("port")}`);
});

module.exports = app;
