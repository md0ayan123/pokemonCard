

import React, { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';

const PokemonList = (props) => {


  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    fetchPokemon('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  }, []);

  const fetchPokemon = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        const promises = data.results.map((poke) => fetch(poke.url).then((res) => res.json()));
        Promise.all(promises).then((details) => {
          setPokemon(details);
          setNextUrl(data.next);
          setPrevUrl(data.previous);
          setLoading(false);
        });
      });
  };

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleNext = () => {
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };
  const handlePrevious = () => {
    if (prevUrl) {
      fetchPokemon(prevUrl);
    }
  };

  return (
    <div >
      <h1 className='my-4 mx-4 text-white'>Pokémon List</h1>
      <input className='search-input mx-4 '
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className='row'>
        {loading ? (
          <p className='text-white'>Loading...</p>
        ) : (
          filteredPokemon.map((poke) => {
            return <div className='map-container col-md-4 ' key={poke.id}>
              <Card imageurl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                name={poke.name}
                types={poke.types.map((typeInfo) => typeInfo.type.name).join(',')} stats={poke.stats.map((stat) => (
                  <p key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </p>
                ))}
              />
            </div>
          })
        )}
      </div>
      <div>
      </div>
      <div className='buttons'>
        <button type="button" class="btn btn-dark" onClick={handlePrevious} disabled={!prevUrl}>
          🡠 Previous
        </button>
        <button type="button" class="btn btn-dark" onClick={handleNext} disabled={!nextUrl}>
          Next 🡢
        </button>
      </div>
    </div>

  );
}

export default PokemonList;
