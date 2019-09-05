import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import reducer from './reducer';

// const persistConfig = {
//     key: 'root',
//     storage:storage.default,
// }

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(reducer);
// const persistor = persistStore(store);

export {
    store,
    // persistor
}