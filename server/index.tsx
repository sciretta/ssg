import express from "express";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import LandingPage from "../src/landing/App";
import CharacterPage from "../src/character/App";
import Character from "../src/character/Character";

const PORT = 3000;

const app = express();

app.get("/", (_, res) => {
  fs.readFile(
    path.resolve("./build/landing.index.html"),
    "utf-8",
    async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Some error happened");
      }

      const fetchRes = await fetch(
        "https://rickandmortyapi.com/api/character/?page=1"
      )
        .then((response) => response.json())
        .then((data: any) =>
          data.results.map(
            (character: {
              id: string;
              image: string;
              name: string;
              url: string;
            }) => ({
              id: character.id,
              img: character.image,
              name: character.name,
              url: character.url,
            })
          )
        )
        .catch((err) => {
          console.log(err);
          return [];
        });

      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <LandingPage initialCharacters={fetchRes} />
          )}</div>`
        )
      );
    }
  );
});

app.get("/character/:id", (req, res) => {
  if (Number.isNaN(Number(req.params.id)))
    return res.sendFile(path.resolve(`./build/${req.params.id}`));

  fs.readFile(
    path.resolve("./build/character.index.html"),
    "utf-8",
    async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Some error happened");
      }

      const fetchRes: any = await fetch(
        `https://rickandmortyapi.com/api/character/${req.params.id}`
      )
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
          return {};
        });

      const characterHTMLData = ReactDOMServer.renderToString(
        <Character
          characterData={{
            id: fetchRes.id,
            img: fetchRes.image,
            name: fetchRes.name,
            status: fetchRes.status,
            species: fetchRes.species,
            url: fetchRes.url,
          }}
        />
      );

      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <CharacterPage characterHTMLData={characterHTMLData} />
          )}</div>`
        )
      );
    }
  );
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
