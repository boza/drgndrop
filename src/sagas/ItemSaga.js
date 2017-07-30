import { DefineTypes } from 'utils/DefineTypes'
import { put, select, takeEvery } from 'redux-saga/effects';

export const listItemTypes = { ...DefineTypes('LIST_ITEMS/GET'), DRAG: 'LIST_ITEMS/GET/DRAG', REMOVE: 'LIST_ITEMS/GET/REMOVE' };

export const initialState = {
  items: new Map()
};

export const actions = {
  moveItemToColumn(columnId) {
    return { type: listItemTypes.REQUEST };
  },

  removeItemToColumn(columnId) {
    return { type: listItemTypes.REMOVE };
  }
};

export const selectors = {
  items: (state) => state.listItems.items
};

export const reducer = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case listItemTypes.REQUEST:
      return { ...state };
    case listItemTypes.SUCCESS:
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
    yield put({ type: listItemTypes.SUCCESS, items: newItems });
  } catch (error) {
    yield put({ type: listItemTypes.FAILURE, error });
  }
}

export function* removeItemSaga({ columnId, item }) {
  try {
    const currentItems = yield select(selectors.items)
    const columnItems = currentItems.get(columnId)
    const itemIndex = columnItems.indexOf(item)
    const newItems = columnItems.splice(itemIndex, 1)
    yield put({ type: listItemTypes.SUCCESS, items: newItems });
  } catch (error) {
    yield put({ type: listItemTypes.FAILURE, error });
  }
}

export function* rootSaga() {
  yield [
    takeEvery(listItemTypes.REQUEST, addItemSaga),
    takeEvery(listItemTypes.REMOVE, removeItemSaga)
  ]
}
