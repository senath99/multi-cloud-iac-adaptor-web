import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// slices
import dataSetReducer from './slices/data-sets';
import settingReducer from './slices/settings';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-'
};

const rootReducer = combineReducers({
  datasets: dataSetReducer,
  settings: settingReducer
});

export { rootPersistConfig, rootReducer };
