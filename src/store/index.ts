import {createStore} from 'redux';
import rootReducer from './modules/rootReducer';
import {IFavoriteState} from './modules/favorite/types';

export interface IState {
  favorite: IFavoriteState;
}

const store = createStore(rootReducer);

export default store;
