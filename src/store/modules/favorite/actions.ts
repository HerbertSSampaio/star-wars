import {ICharacter} from './types';

export function addFavoriteCharacter(character: ICharacter) {
  return {
    type: 'ADD_CHARACTER_TO_FAVORITE',
    payload: {
      character,
    },
  };
}
