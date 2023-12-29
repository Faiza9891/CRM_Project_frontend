import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  customers: [],
  isLoading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    // other reducer logic
    default:
      return state;
  }
};


// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;