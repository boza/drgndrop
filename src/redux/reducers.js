import { combineReducers } from 'redux';
import { reducer as ColumnReducers } from 'sagas/ColumnSaga';
import { routerReducer } from 'react-router-redux';

export const appReducer = combineReducers({
  columns: ColumnReducers,
  routing: routerReducer
});

export default appReducer;
