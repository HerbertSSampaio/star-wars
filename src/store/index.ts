import {createStore} from 'redux';

type Character = {
  name: string;
  url: string;
};

type Action = {
  type: string;
  character: Character;
};

const INITIAL_STATE = {
  characters: [
    {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
};

function FavoriteCharacters(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'ADD_CHARACTER':
      return {...state, characters: [...state.characters, action.character]};
    default:
      return state;
  }
}

const store = createStore(FavoriteCharacters);

export default store;
