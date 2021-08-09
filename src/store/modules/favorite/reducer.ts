import {Reducer} from 'redux';
import {IFavoriteState} from './types';

const INITIAL_STATE: IFavoriteState = {
  characters: [],
};

const favorite: Reducer<IFavoriteState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_CHARACTER_TO_FAVORITE': {
      const newCharacter = action.payload.character;
      const characterInFavoriteIndex = state.characters.findIndex(
        character => character.name === newCharacter.name,
      );

      if (characterInFavoriteIndex > 0) {
        return {...state, characters: [...state.characters]};
      } else {
        return {
          ...state,
          characters: [...state.characters, action.payload.character],
        };
      }
    }
    default:
      return state;
  }
};

export default favorite;
