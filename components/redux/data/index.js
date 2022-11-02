import { createSlice } from "@reduxjs/toolkit";

//  state redux data
const initialState = {
  data: [],
};

const cartSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // add First For localStorage
    addFirstData: (state, action) => {
      state.data = [...action.payload];
    },
    // save To state Add
    addData: (state, action) => {
      state.data = [{ ...action.payload }, ...state.data];
      localStorage.setItem("data", JSON.stringify([...state.data]));
    },
    //Update to was select item
    updateData: (state, action) => {
      const parants = [...state.data];
      const updatedParants = [...parants];
      const parantIndex = updatedParants.findIndex(
        (parant) => parant.id == action.payload.id
      );

      let parant = updatedParants[parantIndex];

      parant.parent = action.payload.parent;
      parant.dic = action.payload.dic;
      parant.color = action.payload.color;
      parant.country = action.payload.country;
      updatedParants[parantIndex] = parant;
      state.data = [...updatedParants];
      localStorage.setItem("data", JSON.stringify([...state.data]));
    },
    //delete to select item
    deleteData: (state, action) => {
      const itemId = action.payload;
      state.data = state.data.filter((item) => item.id !== itemId);
      localStorage.setItem("data", JSON.stringify([...state.data]));
    },
  },
});

export default cartSlice.reducer;
export const { addFirstData, addData, updateData, deleteData } =
  cartSlice.actions;

export const selectData = (state) => state.data.data;
