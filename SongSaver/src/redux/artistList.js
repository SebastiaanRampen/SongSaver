import { createSlice } from "@reduxjs/toolkit";

export const artistSlice = createSlice({
  name: "artistList",
  initialState: [],

  reducers: {
    emptyArtistArray: (state, artistListLength) => {
      state = state.splice(0, artistListLength.payload);
    },

    appendArtist: (state, newArtist) => {
      state = state.push(newArtist.payload);
    },

    modifyArtist: (state, modifiedArtist) => {
      state = state.splice(
        modifiedArtist.payload.index,
        1,
        modifiedArtist.payload.artistData
      );
    },

    replaceArtistList: (state, newList) => {
      state = state.splice(0, newList.payload.artistListLength);
      [newList.payload.newArtistList].forEach((element) => {
        state.push(element);
      });
    },

    deleteArtist: (state, index) => {
      state = state.splice(index.payload, 1);
    },
  },
});

export const {
  emptyArtistArray,
  appendArtist,
  modifyArtist,
  replaceArtistList,
  deleteArtist,
} = artistSlice.actions;

export default artistSlice.reducer;
