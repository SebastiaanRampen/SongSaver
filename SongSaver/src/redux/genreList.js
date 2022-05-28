import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
  name: "genreList",
  initialState: [
    // { key: 0, value: "Rock" },
    // { key: 1, value: "Pop" },
    // { key: 2, value: "Dance" },
    // { key: 3, value: "Hiphop" },
  ],

  reducers: {
    emptyGenreArray: (state, genreListLength) => {
      state = state.splice(0, genreListLength.payload);
    },

    appendGenre: (state, newGenre) => {
      state = state.push(newGenre.payload);
    },

    modifyGenre: (state, modifiedGenre) => {
      state = state.splice(
        modifiedGenre.payload.index,
        1,
        modifiedGenre.payload.GenreData
      );
    },

    replaceGenreList: (state, newList) => {
      state = state.splice(0, newList.payload.genreListLength);
      [newList.payload.newGenreList].forEach((element) => {
        state.push(element);
      });
    },

    deleteGenre: (state, index) => {
      state = state.splice(index.payload, 1);
    },
  },
});

export const {
  emptyGenreArray,
  appendGenre,
  modifyGenre,
  replaceGenreList,
  deleteGenre,
} = genreSlice.actions;

export default genreSlice.reducer;
