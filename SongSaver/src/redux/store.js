import { configureStore } from "@reduxjs/toolkit";
import genreList from "./genreList";
import artistList from "./artistList";
import addNewSong from "./addNewSong";
import songList from "./songList";
import editSong from "./editSong";
import infoClassName from "./infoFieldClassName";

export default configureStore({
  reducer: {
    addNewSong,
    genreList,
    artistList,
    songList,
    editSong,
    infoClassName,
  },
});
