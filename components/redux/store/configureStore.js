// store/configureStore.js

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import data from "../data";

export const wrapper = createWrapper(() =>
  configureStore({
    reducer: {
      data,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  })
);
