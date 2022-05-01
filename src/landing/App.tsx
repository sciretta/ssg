import React, { useEffect, useState } from "react";
import "../App.css";

type Character = {
  id: number;
  img: string;
  name: string;
};

function App({ initialCharacters = [] }: { initialCharacters?: Character[] }) {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);

  const loadCharacters = () => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters((prev) => [
          ...prev,
          ...data.results.map(
            (character: { id: string; image: string; name: string }) => ({
              id: character.id,
              img: character.image,
              name: character.name,
            })
          ),
        ]);
      });
  };

  useEffect(() => {
    loadCharacters();
  }, [page]);

  return (
    <div className="container">
      <div className="row">
        <p className="title">Rick and Morty</p>
      </div>
      <div className="card-container">
        {characters.map((character: Character) => (
          <div
            className="card"
            key={character.id}
            onClick={() =>
              open(`http://localhost:3000/character/${character.id}`)
            }
          >
            <img src={character.img} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setPage((prev) => prev + 1)}>load more</button>
    </div>
  );
}

export default App;
