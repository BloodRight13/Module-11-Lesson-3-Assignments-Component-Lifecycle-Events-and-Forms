// Task 2
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './charcterlist.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
          params: {
            ts: '1',
            apikey: 'YOUR_PUBLIC_API_KEY', // Use your Public API Key
            hash: 'YOUR_HASH', // Use your MD5 hash
          },
        });
        setCharacters(response.data.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="character-grid">
      {characters.map((character) => (
        <div key={character.id} className="character-item">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

// Task 3
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ characterId }) => {
  const [characterDetail, setCharacterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}`, {
          params: {
            ts: '1',
            apikey: 'YOUR_PUBLIC_API_KEY', // Replace with your actual Public API key
            hash: 'YOUR_HASH', // Replace with the MD5 hash
          },
        });
        setCharacterDetail(response.data.data.results[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!characterDetail) return null;

  return (
    <div>
      <h2>{characterDetail.name}</h2>
      <p>{characterDetail.description || "No description available."}</p>
      <h3>Comics:</h3>
      <ul>
        {characterDetail.comics.items.map((comic, index) => (
          <li key={index}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail; CharacterList;

// Task 4 in Marvel app