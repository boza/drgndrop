import { DefineTypes } from 'utils/DefineTypes'
import { put, select, takeEvery } from 'redux-saga/effects';

export const columnTypes = DefineTypes('COLUMS/GET');

export const initialState = {
  columnsCount: 2
};

export const actions = {
  addColumn() {
    return { type: columnTypes.REQUEST };
  }
};

export const selectors = {
  columnsCount: (state) => state.columns.columnsCount
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

export function* addColumnSaga() {
  try {
    const currentColumnsCount = yield select(selectors.columnsCount)
    const columnsCount = currentColumnsCount + 1
    yield put({ type: columnTypes.SUCCESS, columnsCount });
  } catch (error) {
    yield put({ type: columnTypes.FAILURE, error });
  }
}

export function* rootSaga() {
  yield takeEvery(columnTypes.REQUEST, addColumnSaga);
}
