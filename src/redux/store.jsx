import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";
// Store
const store = configureStore({
  reducer: {
    products: reduxSlice,
  },
});

export default store;
