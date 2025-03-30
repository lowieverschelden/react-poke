import React, { useState, useEffect } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokémon niet gevonden');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
        setPokemonData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Voer een Pokémon-naam in"
      />
      {isLoading && <p>Bezig met laden...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
}

export default App;
