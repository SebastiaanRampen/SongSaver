import { createSlice } from "@reduxjs/toolkit";

export const addSongSlice = createSlice({
  name: "addNewSong",
  initialState: {
    key: null,
    title: "",
    artist: "",
    genre: "",
    youTube: "",
    score: 0,
  },

  reducers: {
    addKey: (state, title) => {
      state.key = title.payload;
    },
    addTitle: (state, title) => {
      state.title = title.payload;
    },
    addArtist: (state, artist) => {
      state.artist = artist.payload;
    },
    addGenre: (state, genre) => {
      state.genre = genre.payload;
    },
    addYouTube: (state, youTube) => {
      state.youTube = youTube.payload;
    },
    addScore: (state, score) => {
      state.score = score.payload;
    },
  },
});

export const { addKey, addTitle, addArtist, addGenre, addYouTube, addScore } =
  addSongSlice.actions;

export default addSongSlice.reducer;
