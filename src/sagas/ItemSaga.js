import { DefineTypes } from 'utils/DefineTypes'
import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { DEFAULT_ITEMS } from 'utils/constants';
export const listItemTypes = { ...DefineTypes('LIST_ITEMS/GET'), DRAG: 'LIST_ITEMS/GET/DRAG', REMOVE: 'LIST_ITEMS/GET/REMOVE' };

export const initialState = {
  items: new Map()
};

export const buildDefaultItems = (columnId) => {
  const itemsForCol = [];

  DEFAULT_ITEMS.forEach((item, index) => {
    item.id = `${columnId}-${index}`
    itemsForCol.push(item)
  });

  return itemsForCol;
}

export const actions = {

  addDefaultItems(columnId) {
    return { type: listItemTypes.REQUEST, columnId };
  },

  moveItemToColumn(item, columnId) {
    return { type: listItemTypes.REQUEST, item, columnId };
  },

  removeItemToColumn(item, columnId) {
    return { type: listItemTypes.REMOVE, item, columnId };
  }
};

export const selectors = {
  findColumnItems: (state) => (columnId) => {
    return state.listItems.items.get(columnId) || buildDefaultItems(columnId)
  },
  items: (state) => state.listItems.items
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
    const allItems = yield select(selectors.items);
    const columnItems = allItems.get(columnId) || buildDefaultItems(columnId)

    if (item) {
      columnItems.push(item);
    }

    const newItems = allItems.set(columnId, columnItems);

    yield put({ type: listItemTypes.SUCCESS, items: newItems });
  } catch (error) {
    yield put({ type: listItemTypes.FAILURE, error });
  }
}

export function* removeItemSaga({ columnId, item }) {
  try {
    const allItems = yield select(selectors.items)
    const columnItems = allItems.get(columnId) || buildDefaultItems(columnId)

    const itemIndex = columnItems.findIndex((element) => element.text == item.text)

    columnItems.splice(itemIndex, 1)

    const newItems = allItems.set(columnId, columnItems);

    yield put({ type: listItemTypes.SUCCESS, items: newItems });
  } catch (error) {
    yield put({ type: listItemTypes.FAILURE, error });
  }
}

export function* rootSaga() {
  yield [
    takeLatest(listItemTypes.REQUEST, addItemSaga),
    takeLatest(listItemTypes.REMOVE, removeItemSaga)
  ]
}
