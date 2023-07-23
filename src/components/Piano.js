import React from "react";

import "./Piano.css";

const Piano = ({ notesToPlay, playbackIndex, scaleNotes }) => {
  return (
    <div className="piano-container doodle-border">
      {"Piano"} <br />
      notesToPlay: {notesToPlay.join(" ")}
      <br />
      playbackIndex: {playbackIndex}
      <br />
      scaleNotes: {scaleNotes.join(" ")}
      <br />
    </div>
  );
};

export default Piano;
