import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import "dotenv/config";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const baseSWAPI = process.env.SWAPI_URL;

app.get("/api/people", (req, res) => {
  console.log("get people");
  return fetch(`${baseSWAPI}/people/`)
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
    .catch(err => {
      return res
        .status(400)
        .json({ message: "Oops! There's an issue with your request", err });
    });
});

app.get("/api/people/:id", (req, res) => {
  console.log("get person", req.params.id);
  return fetch(`${baseSWAPI}/people/${req.params.id}`)
    .then(res => res.json())
    .then(response => {
      console.log("swapi response", response);
      return res.status(200).json({ message: "ok", data: [response] });
    })
    .catch(err => {
      return res
        .status(400)
        .json({ message: "Oops! There's an issue with your request", err });
    });
});

app.set("port", 7777);
app.listen(app.get("port"), () => {
  console.log(`Listening on port... ${app.get("port")}`);
});

module.exports = app;
