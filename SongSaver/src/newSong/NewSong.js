import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addArtist,
  addGenre,
  addTitle,
  addYouTube,
  addScore,
} from "../redux/addNewSong";
import { appendArtist } from "../redux/artistList";
import { appendGenre } from "../redux/genreList";
import { appendSong } from "../redux/songList";
import "./newSong.css";

// import RatingSelector from "./NewSong";

export default function AddSong() {
  const newSong = useSelector((state) => state.addNewSong);
  const title = useSelector((state) => state.addNewSong.title);
  const artist = useSelector((state) => state.addNewSong.artist);
  const genre = useSelector((state) => state.addNewSong.genre);
  const youTube = useSelector((state) => state.addNewSong.youTube);
  const score = useSelector((state) => state.addNewSong.score);
  const dispatch = useDispatch();

  const genreList = useSelector((state) => state.genreList);
  const artistList = useSelector((state) => state.artistList);

  const displaySongList = useSelector((state) => state.songList);

  const [fillStars, setFillStars] = useState(score);
  const setStars = [1, 2, 3, 4, 5];

  function leaveRating() {
    setFillStars(score);
  }

  function modifyGenreLists() {
    if (genreList.length === 0) {
      if (genre !== "") {
        dispatch(appendGenre({ key: 0, value: genre }));
      }
    } else {
      if (
        !genreList.some((genre) => {
          return genre.value === newSong.genre;
        })
      ) {
        dispatch(
          appendGenre({
            key: genreList[genreList.length - 1].key + 1,
            value: genre,
          })
        );
      }
    }
  }

  function modifyArtistLists() {
    if (artistList.length === 0) {
      if (artist !== "") {
        dispatch(appendArtist({ key: 0, value: artist }));
      }
    } else {
      if (
        !artistList.some((artist) => {
          return artist.value === newSong.artist;
        })
      ) {
        dispatch(
          appendArtist({
            key: artistList[artistList.length - 1].key + 1,
            value: artist,
          })
        );
      }
    }
  }

  const newKey =
    displaySongList.length === 0
      ? 1
      : displaySongList[displaySongList.length - 1].key + 1;

  function submitSong() {
    let sendNewSong = {
      key: newKey,
      title: "",
      genre: "",
      youTube: "",
      score: "",
    };
    // Ik introduceer sendNewSong omdat ik anders de 'key' niet
    // geupdated krijg voordat de gehele 'newSong' aan de songlist
    // wordt toegevoegd. Het lukt me ook niet om 'newSong' in een
    // keer te copieren, en daarna de 'key' aan te passen.

    sendNewSong.title = newSong.title;
    sendNewSong.artist = newSong.artist;
    sendNewSong.genre = newSong.genre;
    sendNewSong.youTube = newSong.youTube;
    sendNewSong.score = newSong.score;
    dispatch(appendSong(sendNewSong));

    // Naar mijn idee is 'modifyGenreLists' veel te ingewikkeld
    // maar het lukt me niet om direct de oude 'state' genre-array
    // met een nieuwe genrearray te vervangen.
    modifyGenreLists();
    modifyArtistLists();

    dispatch(addTitle(""));
    dispatch(addGenre(""));
    dispatch(addArtist(""));
    dispatch(addYouTube(""));
    dispatch(addScore(0));
    setFillStars(0);
  }

  return (
    <form className="newSongForm">
      <label className="artistLabel">Artist: </label>
      <input
        className="artistInput"
        type="text"
        value={artist}
        placeholder="Artist"
        list="listArtist"
        onChange={(e) => dispatch(addArtist(e.target.value))}
      />
      <datalist id="listArtist">
        {artistList.map((option) => (
          <option key={option.key}>{option.value}</option>
        ))}
      </datalist>
      <label className="genreLabel">Genre: </label>
      <input
        className="genreSelect"
        type="text"
        value={genre}
        placeholder="Genre"
        list="listGenre"
        onChange={(e) => dispatch(addGenre(e.target.value))}
      />
      <datalist id="listGenre">
        {genreList.map((option) => (
          <option key={option.key}>{option.value}</option>
        ))}
      </datalist>
      <label className="songTitleLabel">Songtitle: </label>
      <input
        className="songTitleInput"
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => dispatch(addTitle(e.target.value))}
      />
      <label className="youtubeLabel">YouTube link</label>
      <input
        className="youtubeInput"
        type="text"
        value={youTube}
        placeholder="YouTube link"
        onChange={(e) => dispatch(addYouTube(e.target.value))}
      />
      <span>
        <label className="ratingLabel">Rating: </label>

        {/* <RatingSelector /> */}
        <span className="rating" onMouseLeave={leaveRating}>
          {setStars.map((addStar) => (
            <i
              key={addStar}
              className={
                "rating__star " +
                (fillStars > addStar - 1 ? "fas " : "far ") +
                "fa-star"
              }
              onMouseEnter={() => {
                setFillStars(addStar);
              }}
              onClick={() => dispatch(addScore(addStar))}
            ></i>
          ))}
        </span>
        {/* end ratingSelector */}
      </span>
      <span className="check">
        <i className="fa-solid fa-circle-check" onClick={submitSong}></i>
      </span>
    </form>
  );
}
