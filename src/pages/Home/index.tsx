import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  NameCharacter,
  CharactersButton,
  Pagination,
  PaginationButton,
  PaginationText,
  FavoriteCharactersButton,
  FavoriteCharactersText,
  ListCharacter,
} from './styles';
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

const Home = () => {
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

  async function loadMore(newPage: string | null): Promise<void> {
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
      <ListCharacter persistentScrollbar>
        {characters?.map(character => (
          <CharactersButton key={character.name}>
            <NameCharacter>{character.name}</NameCharacter>
            <Icon name="chevron-right" size={18} color="#ffe81f" />
          </CharactersButton>
        ))}
      </ListCharacter>

      <Pagination>
        {previousPage ? (
          <PaginationButton onPress={() => loadMore(previousPage)}>
            <PaginationText>
              <Icon name="chevron-left" size={70} color="#ffe81f" />
            </PaginationText>
          </PaginationButton>
        ) : (
          <PaginationButton disabled={true}>
            <PaginationText>
              <Icon name="chevron-left" size={70} color="#999" />
            </PaginationText>
          </PaginationButton>
        )}

        {nextPage ? (
          <PaginationButton onPress={() => loadMore(nextPage)}>
            <PaginationText>
              <Icon name="chevron-right" size={70} color="#ffe81f" />
            </PaginationText>
          </PaginationButton>
        ) : (
          <PaginationButton disabled={true}>
            <PaginationText>
              <Icon name="chevron-right" size={70} color="#999" />
            </PaginationText>
          </PaginationButton>
        )}
      </Pagination>

      <FavoriteCharactersButton>
        <FavoriteCharactersText>
          LISTAR PERSONAGENS FAVORITOS
        </FavoriteCharactersText>
      </FavoriteCharactersButton>
    </Container>
  );
};

export default Home;
