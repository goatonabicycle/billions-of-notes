import React from "react";

import MessageBox from "../components/MessageBox";

const MessageBoxes = (props) => {
  return (
    <div className="messages">
      <MessageBox
        showWhen={props.selectedTempo === 0}
        message={"Don't make tempo go to zero! WTF ARE YOU DOING!? OMG!!!"}
      />
      <MessageBox
        showWhen={props.selectedNumberOfNotes === "1"}
        message={"Uhm... Yes. That's a note. Amazing!"}
      />
      <MessageBox
        showWhen={props.selectedNumberOfNotes === "69"}
        message={"Nice!"}
      />
      <MessageBox
        showWhen={props.selectedNumberOfNotes > 200}
        message={"That... is a lot of notes!"}
      />

      <MessageBox
        showWhen={props.selectedTempo > "700"}
        message={"That's an insane amount of tempo!?! Can you handle it?"}
      />
    </div>
  );
};

export default MessageBoxes;
