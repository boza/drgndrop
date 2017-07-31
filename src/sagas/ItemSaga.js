import { DefineTypes } from 'utils/DefineTypes'
import { put, select, takeEvery } from 'redux-saga/effects';

export const listItemTypes = { ...DefineTypes('LIST_ITEMS/GET'), DRAG: 'LIST_ITEMS/GET/DRAG', REMOVE: 'LIST_ITEMS/GET/REMOVE' };

export const initialState = {
  items: new Map()
};

export const actions = {
  moveItemToColumn(item, columnId) {
    return { type: listItemTypes.REQUEST, item, columnId };
  },

  removeItemToColumn(columnId) {
    return { type: listItemTypes.REMOVE };
  }
};

export const selectors = {
  items: (state) => state.listItems.items,
};

export const reducer = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case listItemTypes.REQUEST:
    case listItemTypes.SUCCESS:
    case listItemTypes.FAILURE:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export function* addItemSaga({ columnId, item }) {
  try {
    const allItems = yield select(selectors.items) || new Map()
    const columnItems = allItems.get(columnId) || []

    columnItems.push(item)

    const newItems = allItems.set(columnId, columnItems)

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
