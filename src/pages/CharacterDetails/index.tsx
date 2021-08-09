import React, {useState, useEffect, useCallback} from 'react';
import {
  Container,
  Detail,
  AddFavoriteButton,
  TextButton,
  FavoritedButton,
} from './styles';
import {useRoute} from '@react-navigation/native';
import api from '../../services/api';
import {useDispatch, useSelector} from 'react-redux';
import {ICharacter} from '../../store/modules/favorite/types';
import {addFavoriteCharacter} from '../../store/modules/favorite/actions';
import {IState} from '../../store';

interface RouteParams {
  character_url: string;
}

type CharacterDetails = {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  favorite: boolean;
  url: string;
};

const CharacterDetails = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [character, setCharacter] = useState<CharacterDetails>();
  const favoriteCharacters = useSelector<IState, ICharacter[]>(
    state => state.favorite.characters,
  );

  const dispatch = useDispatch();

  const handleAddFavorite = useCallback(
    (name, url) => {
      if (name === undefined || url === undefined) {
        return;
      }
      const newCharacter = {
        name: name,
        url: url,
      };
      dispatch(addFavoriteCharacter(newCharacter));
    },
    [dispatch],
  );

  useEffect(() => {
    async function findCharacter(): Promise<void> {
      const apiData = await api
        .get(`${routeParams.character_url}`)
        .then(response => response.data);

      const characterInFavoriteIndex = favoriteCharacters.findIndex(
        verifyCharacter => verifyCharacter.name === apiData.name,
      );

      const favorite = characterInFavoriteIndex === -1;

      const newCharacter = {
        name: apiData.name,
        height: apiData.height,
        mass: apiData.mass,
        hair_color: apiData.hair_color,
        skin_color: apiData.skin_color,
        eye_color: apiData.eye_color,
        birth_year: apiData.birth_year,
        gender: apiData.gender,
        favorite: !favorite,
        url: apiData.url,
      };

      setCharacter(newCharacter);
    }
    findCharacter();
  }, [favoriteCharacters, routeParams.character_url]);

  return (
    <Container>
      <Detail>Nome: {character?.name}</Detail>
      <Detail>Altura: {character?.height}</Detail>
      <Detail>Peso: {character?.mass}</Detail>
      <Detail>Cor de cabelo: {character?.hair_color}</Detail>
      <Detail>Cor de pele: {character?.skin_color}</Detail>
      <Detail>Cor dos olhos: {character?.eye_color}</Detail>
      <Detail>Gênero: {character?.gender}</Detail>
      <Detail>Aniversário: {character?.birth_year}</Detail>
      {character?.favorite ? (
        <FavoritedButton disabled>
          <TextButton>PERSONAGEM FAVORITO</TextButton>
        </FavoritedButton>
      ) : (
        <AddFavoriteButton
          onPress={() => handleAddFavorite(character?.name, character?.url)}>
          <TextButton>ADICIONAR AOS FAVORITOS</TextButton>
        </AddFavoriteButton>
      )}
    </Container>
  );
};

export default CharacterDetails;
