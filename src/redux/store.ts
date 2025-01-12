import { configureStore } from "@reduxjs/toolkit";

import cartSliceReducer from "./slices/cart.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSliceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
