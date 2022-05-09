import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";

import LandingPage from "../src/landing/App";
import CharacterPage from "../src/character/App";
import Character from "../src/character/Character";
import fetch from "node-fetch";

function getBuildPageModel(page: string): string {
  if (!page) throw new Error("No page provided");
  let fileData = fs.readFileSync(
    path.resolve(`./build/${page}.index.html`),
    "utf-8"
  );
  return fileData;
}

export const generatePage = (page: string): ((param?: number) => void) => {
  const data = getBuildPageModel(page);

  switch (page) {
    case "landing":
      {
        return async () => {
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

          const renderedData = data.replace(
            '<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToString(
              <LandingPage initialCharacters={fetchRes} />
            )}</div>`
          );

          fs.writeFileSync(path.resolve(`./build/landing.html`), renderedData);
        };
      }
      break;
    case "character":
      {
        return async (param) => {
          const fetchRes: any = await fetch(
            `https://rickandmortyapi.com/api/character/${param}`
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

          const renderedData = data.replace(
            '<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToString(
              <CharacterPage characterHTMLData={characterHTMLData} />
            )}</div>`
          );

          fs.writeFileSync(
            path.resolve(`./build/character.${param}.html`),
            renderedData
          );
        };
      }
      break;
    default:
      throw new Error("No valid page provided");
  }
};

const automatedGeneration = () => {
  const page = process.argv[2];
  switch (page) {
    case "landing":
      generatePage("landing")();
      break;
    case "character":
      {
        for (let i = 1; i <= 5; i++) {
          generatePage("character")(i);
        }
      }
      break;
    default:
      return;
  }
};

automatedGeneration();
