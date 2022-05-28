import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyGenreArray, appendGenre } from "../redux/genreList";
import { emptyArtistArray, appendArtist } from "../redux/artistList";
import { appendSong } from "../redux/songList";
import { startSongList } from "../SongList";

import AddSongToDom from "./addSongToDom";
import EditSong from "./editSong";
import "./listSongs.css";

export default function ListSongs() {
  const songList = useSelector((state) => state.songList);
  const editThisSong = useSelector((state) => state.editSong.key);
  const genreList = useSelector((state) => state.genreList);
  const artistList = useSelector((state) => state.artistList);
  const dispatch = useDispatch();

  let displaySongList = [...songList];

  const [artistFilter, setArtistFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sorter, setSorter] = useState("Entry");
  const [directionUp, setDirection] = useState(true);

  function fillArtistList(sourceSongList) {
    let newArtistList = [];
    if (sourceSongList.length > 0) {
      sourceSongList.forEach((song) => {
        if (
          !newArtistList.some((artist) => {
            return artist.value === song.artist;
          }) ||
          newArtistList.length === 0
        ) {
          newArtistList.push({ key: newArtistList.length, value: song.artist });
        }
      });
      const artistListLength = artistList.length;
      dispatch(emptyArtistArray(artistListLength));
      newArtistList.map((artist) => dispatch(appendArtist(artist)));
    }
  }

  function fillGenreList(sourceSongList) {
    let newGenreList = [];
    if (sourceSongList.length > 0) {
      sourceSongList.forEach((song) => {
        if (
          !newGenreList.some((genre) => {
            return genre.value === song.genre;
          }) ||
          newGenreList.length === 0
        ) {
          newGenreList.push({ key: newGenreList.length, value: song.genre });
        }
      });
      const genreListLength = genreList.length;
      dispatch(emptyGenreArray(genreListLength));
      newGenreList.map((genre) => dispatch(appendGenre(genre)));
    }
  }

  useEffect(() => {
    startSongList.map((song) => dispatch(appendSong(song)));
    fillArtistList(startSongList);
    fillGenreList(startSongList);
    //https://bobbyhadz.com/blog/react-hook-useeffect-has-missing-dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  displaySongList = displaySongList.sort(function (a, b) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let A, B;
    switch (sorter) {
      case "Rating":
        A = a.score;
        B = b.score;
        break;
      case "Artist":
        A = a.artist.toUpperCase();
        B = b.artist.toUpperCase();
        break;
      case "Genre":
        A = a.genre.toUpperCase();
        B = b.genre.toUpperCase();
        break;
      case "Song":
        A = a.title.toUpperCase();
        B = b.title.toUpperCase();
        break;
      default:
        B = a.key;
        A = b.key;
    }

    if (A < B) {
      if (directionUp) {
        return 1;
      } else {
        return -1;
      }
    }
    // if (A > B) {
    else {
      if (directionUp) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  displaySongList.reverse();

  displaySongList = displaySongList.filter((filterSong) => {
    return filterSong.artist.toUpperCase().includes(artistFilter.toUpperCase());
  });
  displaySongList = displaySongList.filter((filterSong) => {
    return filterSong.genre.toUpperCase().includes(genreFilter.toUpperCase());
  });

  function changeOrder(e) {
    setSorter(e.target.value);
  }

  function filterAuthorSongList(e) {
    setArtistFilter(e.target.value);
  }

  function filterGenreSongList(e) {
    setGenreFilter(e.target.value);
  }

  return (
    <div>
      <div className="selectionfield">
        <label className="filterLabel">Filter:</label>
        <label className="artistLabel">Artist:</label>
        <input
          className="artistInput"
          type="text"
          placeholder="Artist"
          list="listArtist"
          onFocus={(e) => e.target.select()}
          onChange={(e) => filterAuthorSongList(e)}
        />
        <datalist id="listArtist">
          {artistList.map((option) => (
            <option key={option.key}>{option.value}</option>
          ))}
        </datalist>

        <label className="orderLabel">Arrange by: </label>
        <select
          id="genreDropDown"
          name="Genres"
          onChange={(e) => changeOrder(e)}
        >
          <option value="Entry">Entry</option>
          <option value="Rating">Rating</option>
          <option value="Artist">Artist</option>
          <option value="Genre">Genre</option>
          <option value="Song">Song</option>
        </select>
        <span>
          <i
            className={
              directionUp
                ? "fa-solid fa-arrow-down-short-wide"
                : "fa-solid fa-arrow-down-wide-short"
            }
            onClick={() => setDirection(!directionUp)}
          ></i>
        </span>

        <label className="genreLabel">Genre:</label>
        <input
          className="genreInput"
          type="text"
          placeholder="Genre"
          list="listGenre"
          onFocus={(e) => e.target.select()}
          onChange={(e) => filterGenreSongList(e)}
        />
        <datalist id="listGenre">
          {genreList.map((option) => (
            <option key={option.key}>{option.value}</option>
          ))}
        </datalist>
        <br />
      </div>

      {displaySongList.map((song) => (
        <div key={song.key}>
          {song.key === editThisSong ? (
            <EditSong song={song} />
          ) : (
            <AddSongToDom song={song} />
          )}
        </div>
      ))}
    </div>
  );
}
