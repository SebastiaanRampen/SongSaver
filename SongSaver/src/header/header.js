import React from "react";
import "./header.css";
import { renameClasName } from "../redux/infoFieldClassName";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const infoHide = useSelector((state) => state.infoClassName);
  const dispatch = useDispatch();
  const headerText = " - Song Saver - ";

  return (
    <header>
      <h2>
        <i className="fa-solid fa-music"></i> {headerText}
        <i className="fa-solid fa-music"></i>
      </h2>
      <i
        className="fa-solid fa-circle-info"
        onClick={() => dispatch(renameClasName(!infoHide.hide))}
      ></i>
    </header>
  );
}
