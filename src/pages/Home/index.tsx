import React, {useState, useEffect} from 'react';

import {Container, NameCharacter, CharactersButton} from './styles';
import api from '../../services/api';
import axios from 'axios';

type CharacterDetais = {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

type Character = {
  name: string;
  url: string;
};

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    async function findCharacters(): Promise<void> {
      const apiData = await api.get('/people').then(response => response.data);

      const newCharacters = apiData.results.map((character: Character) => {
        const newCharacter = {
          name: character.name,
          url: character.url,
        };

        return newCharacter;
      });

      setCharacters(newCharacters);

      setNextPage(apiData.next);
      setPreviousPage(apiData.previous);
    }
    findCharacters();
  }, []);

  async function Pagination(newPage: string | null): Promise<void> {
    const apiData = await axios
      .create()
      .get(`${newPage}`)
      .then(response => response.data);

    const newCharacters = apiData.results.map((character: Character) => {
      const newCharacter = {
        name: character.name,
        url: character.url,
      };

      return newCharacter;
    });

    setCharacters(newCharacters);
    setNextPage(apiData.next);
    setPreviousPage(apiData.previous);
  }

  return (
    <Container>
      {characters?.map(character => (
        <NameCharacter key={character.name}>{character.name}</NameCharacter>
      ))}
      {nextPage && (
        <CharactersButton onPress={() => Pagination(nextPage)}>
          <NameCharacter>Next</NameCharacter>
        </CharactersButton>
      )}

      {previousPage && (
        <CharactersButton onPress={() => Pagination(previousPage)}>
          <NameCharacter>Previous</NameCharacter>
        </CharactersButton>
      )}
    </Container>
  );
};

export default Home;
