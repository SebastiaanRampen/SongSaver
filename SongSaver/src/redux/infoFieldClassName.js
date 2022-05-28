import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "infoClassName",
  initialState: { infoClassName: "info hide", hide: true },

  reducers: {
    renameClasName: (state, hideStatus) => {
      state.hide = hideStatus.payload;

      hideStatus.payload === true
        ? (state.infoClassName = "info hide")
        : (state.infoClassName = "info");
    },
  },
});

export const { renameClasName } = infoSlice.actions;

export default infoSlice.reducer;
