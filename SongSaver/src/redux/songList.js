import { createSlice } from "@reduxjs/toolkit";

export const songListSlice = createSlice({
  name: "songList",
  initialState: [
    // {
    //   key: 1,
    //   title: "As It Was",
    //   artist: "Harry Styles",
    //   genre: "Pop",
    //   youTube: "https://youtu.be/H5v3kku4y6Q",
    //   score: 3,
    // },
  ],

  reducers: {
    appendSong: (state, newSong) => {
      state = state.push(newSong.payload);
    },

    modifySong: (state, modifiedSong) => {
      state = state.splice(
        modifiedSong.payload.index,
        1,
        modifiedSong.payload.song
      );
    },

    deleteSong: (state, index) => {
      state = state.splice(index.payload, 1);
    },
  },
});

export const { appendSong, modifySong, deleteSong } = songListSlice.actions;

export default songListSlice.reducer;
