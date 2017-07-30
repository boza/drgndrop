import { spawn } from 'redux-saga/effects';
import { rootSaga as ColumnSaga } from 'sagas/ColumnSaga';
import { rootSaga as ItemSaga } from 'sagas/ItemSaga';

export default function* () {
  return yield [
    spawn(ColumnSaga),
    spawn(ItemSaga)
  ];
}
