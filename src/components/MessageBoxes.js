import React from "react";

import MessageBox from "../components/MessageBox";

const MessageBoxes = ({ selectedTempo, selectedNumberOfNotes }) => {
  return (
    <div className="messages">
      <MessageBox
        showWhen={selectedTempo === 0}
        message={"Don't make tempo go to zero! WTF ARE YOU DOING!? OMG!!!"}
      />
      <MessageBox
        showWhen={selectedNumberOfNotes === "1"}
        message={"Uhm... Yes. That's a note. Amazing!"}
      />
      <MessageBox
        showWhen={selectedNumberOfNotes === "69"}
        message={"Nice!"}
      />
      <MessageBox
        showWhen={selectedNumberOfNotes > 200}
        message={"That... is a lot of notes!"}
      />
      <MessageBox
        showWhen={selectedTempo >= 700}
        message={"That's an insane amount of tempo!?! Can you handle it?"}
      />
    </div>
  );
};

export default MessageBoxes;
