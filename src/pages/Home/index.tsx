import React, {useState, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

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

type Character = {
  name: string;
  url: string;
};

const Home = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState<Character[]>();
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const handleSelectCharacter = useCallback(
    (character_url: string) => {
      navigation.navigate('CharacterDetails', {character_url});
    },
    [navigation],
  );

  const handleListFavorites = useCallback(() => {
    navigation.navigate('FavoriteCharacters');
  }, [navigation]);

  useEffect(() => {
    async function findCharacters(): Promise<void> {
      const apiData = await api
        .get('https://swapi.dev/api/people')
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
    findCharacters();
  }, []);

  async function loadMore(newPage: string | null): Promise<void> {
    const apiData = await api.get(`${newPage}`).then(response => response.data);

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
          <CharactersButton
            key={character.name}
            onPress={() => handleSelectCharacter(character.url)}>
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
        <FavoriteCharactersText onPress={() => handleListFavorites()}>
          LISTAR PERSONAGENS FAVORITOS
        </FavoriteCharactersText>
      </FavoriteCharactersButton>
    </Container>
  );
};

export default Home;
