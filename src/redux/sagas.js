import { spawn } from 'redux-saga/effects';
import { rootSaga as ColumnSaga } from 'sagas/ColumnSaga';

export default function* () {
  return yield [
    spawn(ColumnSaga)
  ];
}
