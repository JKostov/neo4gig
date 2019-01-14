
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import breadcrumb from './breadcrumb';
import anticipatedEvents from './anticipatedEvents';
import genre from './genre';
import feed from './feed';

const persistConfig = {
  key: 'root',
  transforms: [immutableTransform()],
  storage,
  whitelist: ['auth'],
};

const combinedReducers = combineReducers({
  auth,
  breadcrumb,
  anticipatedEvents,
  genre,
  feed,
});

export default persistReducer(persistConfig, combinedReducers);
