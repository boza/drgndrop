import { DefineTypes } from 'utils/DefineTypes'
import { put, select, takeEvery } from 'redux-saga/effects';

export const columnTypes = { ...DefineTypes('LIST_ITEMS/GET'), REMOVE: 'LIST_ITEMS/GET/REMOVE' };

export const initialState = {
  items: new Map()
};

export const actions = {
  moveItemToColumn(columnId) {
    return { type: columnTypes.REQUEST };
  },

  removeItemToColumn(columnId) {
    return { type: columnTypes.REMOVE };
  }
};

export const selectors = {
  items: (state) => state.listItems.items
};

export const reducer = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case columnTypes.REQUEST:
      return { ...state };
    case columnTypes.SUCCESS:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export function* addItemSaga({ columnId, item }) {
  try {
    const currentItems = yield select(selectors.items)
    const columnItems = currentItems.get(columnId)
    const newItems = columnItems.set(columnId, columnItems.push(item))
    yield put({ type: columnTypes.SUCCESS, items: newItems });
  } catch (error) {
    yield put({ type: columnTypes.FAILURE, error });
  }
}

export function* removeItemSaga({ columnId, item }) {
  try {
    const currentItems = yield select(selectors.items)
    const columnItems = currentItems.get(columnId)
    const itemIndex = columnItems.indexOf(item)
    const newItems = columnItems.splice(itemIndex, 1)
    yield put({ type: columnTypes.SUCCESS, items: newItems });
  } catch (error) {
    yield put({ type: columnTypes.FAILURE, error });
  }
}

export function* rootSaga() {
  yield [
    takeEvery(columnTypes.REQUEST, addItemSaga),
    takeEvery(columnTypes.REMOVE, removeItemSaga)
  ]
}
