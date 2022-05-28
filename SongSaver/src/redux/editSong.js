import { createSlice } from "@reduxjs/toolkit";

export const editSongSlice = createSlice({
  name: "editSong",
  initialState: {
    key: -1,
    title: "",
    artist: "",
    originalArtist: "",
    genre: "",
    originalGenre: "",
    youTube: "",
    score: 0,
  },

  reducers: {
    fillOriginalData: (state, originalData) => {
      //      state = originalData.payload;
      // waarom werkt bovenstaande niet?
      // en moet ik al het onderstaande laten doen?
      state.key = originalData.payload.key;
      state.title = originalData.payload.title;
      state.artist = originalData.payload.artist;
      state.originalArtist = originalData.payload.artist;
      state.genre = originalData.payload.genre;
      state.originalGenre = originalData.payload.genre;
      state.youTube = originalData.payload.youTube;
      state.score = originalData.payload.score;
    },
    selectForEdit: (state, key) => {
      state.key = key.payload;
    },

    editTitle: (state, title) => {
      state.title = title.payload;
    },
    editArtist: (state, artist) => {
      state.artist = artist.payload;
    },
    editGenre: (state, genre) => {
      state.genre = genre.payload;
    },
    editYouTube: (state, youTube) => {
      state.youTube = youTube.payload;
    },
    editScore: (state, score) => {
      state.score = score.payload;
    },
  },
});

export const {
  fillOriginalData,
  selectForEdit,
  editTitle,
  editArtist,
  editGenre,
  editYouTube,
  editScore,
} = editSongSlice.actions;

export default editSongSlice.reducer;
