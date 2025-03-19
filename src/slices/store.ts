import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { cartReducer } from "./productsSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  } }),
});

export const persistor = persistStore(store);
persistor.persist();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;