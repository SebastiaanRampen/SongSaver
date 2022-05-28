import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editArtist,
  editGenre,
  editTitle,
  editYouTube,
  editScore,
  selectForEdit,
} from "../redux/editSong";
import { modifySong } from "../redux/songList";
import { deleteGenre, modifyGenre, appendGenre } from "../redux/genreList";
import { appendArtist, deleteArtist, modifyArtist } from "../redux/artistList";
import "./editSong.css";

export default function EditSong() {
  const editSong = useSelector((state) => state.editSong);
  const editThisSong = useSelector((state) => state.editSong.key);
  const title = useSelector((state) => state.editSong.title);
  const artist = useSelector((state) => state.editSong.artist);
  const originalArtist = useSelector((state) => state.editSong.originalArtist);
  const genre = useSelector((state) => state.editSong.genre);
  const originalGenre = useSelector((state) => state.editSong.originalGenre);
  const youTube = useSelector((state) => state.editSong.youTube);
  const score = useSelector((state) => state.editSong.score);
  //
  const songList = useSelector((state) => state.songList);
  const genreList = useSelector((state) => state.genreList);
  const artistList = useSelector((state) => state.artistList);
  const dispatch = useDispatch();

  const [fillStars, setFillStars] = useState(score);
  const setStars = [1, 2, 3, 4, 5];

  function leaveRating() {
    setFillStars(score);
  }

  function updateArtists() {
    let tempCount = 0;
    if (
      artistList.some((artistItem) => {
        return artistItem.value === artist;
      })
    ) {
      // console.log("niet nieuw");
      if (
        songList.reduce((artistCount, songItem) => {
          songItem.artist === originalArtist
            ? (tempCount = artistCount + 1)
            : (tempCount = artistCount);
          return tempCount;
        }, 0) < 2
      ) {
        // console.log("remove old artist");
        dispatch(
          deleteArtist(
            artistList.findIndex(
              (checkArtist) => checkArtist.value === originalArtist
            )
          )
        );
      }
    } else {
      // console.log("wel nieuw");
      if (
        songList.reduce((artistCount, songItem) => {
          songItem.artist === originalArtist
            ? (tempCount = artistCount + 1)
            : (tempCount = artistCount);
          return tempCount;
        }, 0) < 2
      ) {
        // console.log("replace artist");
        const index = artistList.findIndex(
          (findArtist) => findArtist.value === originalArtist
        );
        const sendInfo = {
          artistData: { key: artistList[index].key, value: artist },
          index: index,
        };
        dispatch(modifyArtist(sendInfo));
      } else {
        // console.log("add artist");
        dispatch(
          appendArtist({
            key: artistList[artistList.length - 1].key + 1,
            value: artist,
          })
        );
      }
    }
  }

  function updateGenres() {
    let tempCount = 0;
    if (
      genreList.some((genreItem) => {
        return genreItem.value === genre;
      })
    ) {
      if (
        songList.reduce((genreCount, songItem) => {
          songItem.genre === originalGenre
            ? (tempCount = genreCount + 1)
            : (tempCount = genreCount);
          return tempCount;
        }, 0) < 2
      ) {
        dispatch(
          deleteGenre(
            genreList.findIndex(
              (checkGenre) => checkGenre.value === originalGenre
            )
          )
        );
      }
    } else {
      if (
        songList.reduce((genreCount, songItem) => {
          songItem.genre === originalGenre
            ? (tempCount = genreCount + 1)
            : (tempCount = genreCount);
          return tempCount;
        }, 0) < 2
      ) {
        const index = genreList.findIndex(
          (findGenre) => findGenre.value === originalGenre
        );
        const sendInfo = {
          GenreData: { key: genreList[index].key, value: genre },
          index: index,
        };
        dispatch(modifyGenre(sendInfo));
      } else {
        dispatch(
          appendGenre({
            key: genreList[genreList.length - 1].key + 1,
            value: genre,
          })
        );
      }
    }
  }

  function submitSong() {
    const index = songList.findIndex((song) => song.key === editThisSong);
    const sendInfo = { song: editSong, index: index };
    dispatch(modifySong(sendInfo));
    if (artist !== originalArtist) {
      updateArtists();
      updateGenres();
    }
    dispatch(selectForEdit(-1));
  }

  return (
    <div className="EditSongForm">
      <label className="artistLabel">Artist: </label>
      <input
        className="artistInput"
        type="text"
        value={artist}
        placeholder="Artist"
        list="artistListID"
        onChange={(e) => dispatch(editArtist(e.target.value))}
      />
      <datalist id="artistListID">
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
        list="genreListID"
        onChange={(e) => dispatch(editGenre(e.target.value))}
      />
      <datalist id="genreListID">
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
        onChange={(e) => dispatch(editTitle(e.target.value))}
      />

      <label className="youtubeLabel">YouTube link</label>
      <input
        className="youtubeInput"
        type="text"
        value={youTube}
        placeholder="YouTube link"
        onChange={(e) => dispatch(editYouTube(e.target.value))}
      />
      <span>
        <label className="ratingLabel">Rating: </label>
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
              onClick={() => dispatch(editScore(addStar))}
            ></i>
          ))}
        </span>
      </span>
      <i className="fa-solid fa-circle-check" onClick={submitSong}></i>
      <i
        className="fa-solid fa-circle-xmark"
        onClick={() => dispatch(selectForEdit(-1))}
      ></i>
    </div>
  );
}
