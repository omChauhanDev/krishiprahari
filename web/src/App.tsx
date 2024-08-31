import React from "react";
import Navbar from "./Navbar";
import Content from "./Content";
// import WebcamImage from "./WebCamImage";

export default function App() {
  return (
    <main className="App flex min-h-screen flex-col">
      <Navbar />
      <Content />
    </main>
  );
}
