import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../redux/addNewSong";

export default function RatingSelector() {
  const score = useSelector((state) => state.addNewSong.score);
  const dispatch = useDispatch();

  const [fillStars, setFillStars] = useState(score);
  const setStars = [1, 2, 3, 4, 5];

  function leaveRating() {
    setFillStars(score);
  }

  return (
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
  );
}
