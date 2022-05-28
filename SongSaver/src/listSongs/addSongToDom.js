import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong } from "../redux/songList";
import { fillOriginalData } from "../redux/editSong";
import "./addSongToDom.css";
import { deleteGenre } from "../redux/genreList";
import { deleteArtist } from "../redux/artistList";

export default function AddSongToDom({ song }) {
  const setStars = [1, 2, 3, 4, 5];
  const songList = useSelector((state) => state.songList);
  const editThisSong = useSelector((state) => state.editSong.key);
  const genreList = useSelector((state) => state.genreList);
  const artistList = useSelector((state) => state.artistList);
  const dispatch = useDispatch();

  function editSong() {
    dispatch(fillOriginalData(song));
  }

  function updateArtists() {
    let tempCount = 0;
    if (
      songList.reduce((artistCount, checkSong) => {
        checkSong.artist === song.artist
          ? (tempCount = artistCount + 1)
          : (tempCount = artistCount);
        return tempCount;
      }, 0) < 2
    ) {
      dispatch(
        deleteArtist(
          artistList.findIndex(
            (checkArtist) => checkArtist.value === song.artist
          )
        )
      );
    }
  }

  function updateGenres() {
    let tempCount = 0;
    if (
      songList.reduce((genreCount, checkSong) => {
        checkSong.genre === song.genre
          ? (tempCount = genreCount + 1)
          : (tempCount = genreCount);
        return tempCount;
      }, 0) < 2
    ) {
      dispatch(
        deleteGenre(
          genreList.findIndex((checkGenre) => checkGenre.value === song.genre)
        )
      );
    }
  }

  function removeSong() {
    dispatch(
      deleteSong(songList.findIndex((checkSong) => checkSong.key === song.key))
    );

    updateGenres();
    updateArtists();
  }

  return (
    <form className="songForm">
      <label className="artist">{song.artist}</label>
      <label className="genre">{song.genre}</label>

      <label className="song"> {song.title}</label>
      <i
        className={
          song.youTube === ""
            ? "fa-brands fa-youtube"
            : "fa-brands fa-youtube withData"
        }
        onClick={() => {
          if (song.youTube !== "") {
            window.open(song.youTube);
          }
        }}
      ></i>
      <span className="rating">
        {setStars.map((addStar) => (
          <i
            key={addStar}
            className={
              "rating__star " +
              (song.score > addStar - 1 ? "fas " : "far ") +
              "fa-star"
            }
          ></i>
        ))}
      </span>
      {editThisSong === -1 ? (
        <i className="fa-solid fa-pencil" onClick={() => editSong(song)}></i>
      ) : null}
      {editThisSong === -1 ? (
        <i className="fa-solid fa-trash-can" onClick={() => removeSong()}></i>
      ) : null}
    </form>
  );
}
