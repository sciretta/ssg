import React, { useEffect, useState } from "react";

type Character = {
  id: number;
  img: string;
  name: string;
  status: string;
  species: string;
  url: string;
};

const Character = ({ characterData }: { characterData?: Character }) => (
  <div className="container">
    <div className="container">{characterData.name}</div>
    <div className="card-container">
      <div>{characterData.species}</div>-<div>{characterData.status}</div>
    </div>
    <div className="container">
      <a className="card" href={characterData.url}>
        <img src={characterData.img} alt={characterData.name} />
      </a>
    </div>
  </div>
);

export default Character;
