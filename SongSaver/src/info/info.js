import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./info.css";

import { renameClasName } from "../redux/infoFieldClassName";

export default function Info() {
  const infoHide = useSelector((state) => state.infoClassName);
  const dispatch = useDispatch();

  return (
    <div id="infoField" className={infoHide.infoClassName}>
      <p>
        Created by Sebastiaan W. Rampen
        <br />
        Version 1.0.0
        <br />
        29/05/2022
      </p>
      <p>
        React Assignment
        <br />
        for Front End Development course
        <br />
        by Winc Academy (<a href="url">https://www.wincacademy.nl</a>)
      </p>
      <i
        className="fa-solid fa-circle-xmark"
        onClick={() => dispatch(renameClasName(!infoHide.hide))}
      ></i>
    </div>
  );
}
