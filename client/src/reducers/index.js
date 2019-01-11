
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import breadcrumb from './breadcrumb';
import mostAnticipated from './mostAnticipated';
import genre from './genre';

const persistConfig = {
  key: 'root',
  transforms: [immutableTransform()],
  storage,
  whitelist: ['auth'],
};

const combinedReducers = combineReducers({
  auth,
  breadcrumb,
  mostAnticipated,
  genre,
});

export default persistReducer(persistConfig, combinedReducers);
