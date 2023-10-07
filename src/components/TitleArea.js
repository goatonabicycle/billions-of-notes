import React, { memo } from "react";
import Title from "./Title";
import LineRenderer from "./LineRenderer";
import Counter from "./Counter";
import ExplainButton from "./ExplainButton";
import KofiButton from "./KofiButton";

const TitleArea = memo(
  ({
    selectedTempo,
    setTriggerRegenerate,
    triggerRegenerate,
    currentColour,
    randomNotes,
    currentIndex,
    count,
  }) => {
    return (
      <>
        <h1>
          <Title selectedTempo={selectedTempo} />
        </h1>
        <div className="fun-things">
          <LineRenderer
            onClick={() => {
              setTriggerRegenerate(!triggerRegenerate);
            }}
            colour={currentColour}
            notes={randomNotes}
            tempo={selectedTempo}
            activeNote={currentIndex}
          />
          {/* <Counter count={count} /> */}

          <div className="tiny-links">
            <a
              href="https://github.com/goatonabicycle/billions-of-notes"
              target="_blank"
              className="source-code"
              rel="noreferrer">
              Source code
            </a>
            {"|"}
            <ExplainButton />
            {"|"}
            <KofiButton />
            {"|"}
            <a
              href="/what-scale"
              target="_blank"
              className="source-code"
              rel="noreferrer">
              What's the scale?
            </a>
            {"|"}
            <button
              className="link-looking-button"
              onClick={() => {
                document.body.classList.toggle("light-mode");
              }}>
              Toggle theme
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default TitleArea;
