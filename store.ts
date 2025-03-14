import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { cartReducer } from "./src/slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;