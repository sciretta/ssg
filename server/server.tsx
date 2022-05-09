import express from "express";
import path from "path";
import fs from "fs";
import { generatePage } from "./generator";

const PORT = 3000;

const app = express();

app.get("/", (_, res) => {
  return res.sendFile(path.resolve(`./build/landing.html`), "utf-8");
});

app.get("/character/:id", async (req, res) => {
  if (Number.isNaN(Number(req.params.id)))
    return res.sendFile(path.resolve(`./build/${req.params.id}`));

  if (fs.existsSync(path.resolve(`./build/character.${req.params.id}.html`))) {
    return res.sendFile(
      path.resolve(`./build/character.${req.params.id}.html`)
    );
  }

  await generatePage("character")(Number(req.params.id));

  if (fs.existsSync(path.resolve(`./build/character.${req.params.id}.html`))) {
    return res.sendFile(
      path.resolve(`./build/character.${req.params.id}.html`)
    );
  } else {
    return res.send("this file does not exist");
  }
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
