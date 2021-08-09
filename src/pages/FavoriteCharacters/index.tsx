import {
  Container,
  ListCharacter,
  CharactersButton,
  NameCharacter,
} from './styles';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

type Character = {
  name: string;
  url: string;
};

const FavoriteCharacters = () => {
  const navigation = useNavigation();
  const characters = useSelector(state => state.characters);

  const handleSelectCharacter = useCallback(
    (character_url: string) => {
      navigation.navigate('CharacterDetails', {character_url});
    },
    [navigation],
  );

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
    </Container>
  );
};

export default FavoriteCharacters;
