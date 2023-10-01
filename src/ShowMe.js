import React from "react";
import Guitar from "./components/Guitar";

function ShowMe() {
  return (
    <>
      <h1>Show Me Page</h1>
      There will be a file input here that allows you to import a .midi file.
      Having an alternative way to allow users to make up a song might be nice
      as well.
      <Guitar
        playbackIndex={0}
        notesToPlay={["a3"]}
        scaleNotes={[]}
      />
    </>
  );
}

export default ShowMe;
