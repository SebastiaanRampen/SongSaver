// import logo from "./logo.svg";
import React from "react";
import Header from "./header/header";
import AddSong from "./newSong/NewSong";
import "./App.css";
import ListSongs from "./listSongs/ListSongs";
import Info from "./info/info";

function App() {
  return (
    <div className="App">
      <Header />
      <Info />
      <AddSong />
      <ListSongs />
    </div>
  );
}

export default App;
