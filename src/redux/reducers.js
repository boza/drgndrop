import { combineReducers } from 'redux';
import { reducer as ColumnReducers } from 'sagas/ColumnSaga';
import { reducer as ItemReducers } from 'sagas/ItemSaga';
import { routerReducer } from 'react-router-redux';

export const appReducer = combineReducers({
  columns: ColumnReducers,
  listItems: ItemReducers,
  routing: routerReducer
});

export default appReducer;
