import React, { useCallback } from "react";
import IconButton from "./IconButton";

import {
  ShareIcon,
  SaveIcon,
  NewNotesIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "./Icons";

const ButtonBlock = ({
  setTriggerRegenerate,
  triggerRegenerate,
  isPlaying,
  setIsPlaying,
  resetInputs,
  selectedKey,
  selectedScale,
  selectedNumberOfNotes,
  selectedTempo,
  selectedInstrument,
  selectedOctaves,
  randomNotes,
  setShareButtonText,
  shareButtonText,
  SaveToMidi,
}) => {
  const handleNewNotesClick = useCallback(
    () => setTriggerRegenerate(!triggerRegenerate),
    [triggerRegenerate]
  );
  const handlePlayPauseClick = useCallback(
    () => setIsPlaying(!isPlaying),
    [isPlaying]
  );
  const handleResetClick = useCallback(() => resetInputs(), []);
  const handleShareClick = useCallback(() => {
    const url = new URL(window.location.href);
    const inputs = [
      selectedKey,
      selectedScale,
      selectedNumberOfNotes,
      selectedTempo,
      selectedInstrument,
    ].join(",");
    url.searchParams.set("inputs", inputs);
    url.searchParams.set("octaves", selectedOctaves.join(","));
    url.searchParams.set("notes", encodeURIComponent(randomNotes.join(",")));

    navigator.clipboard.writeText(url.toString());
    setShareButtonText("Link copied!");

    setTimeout(() => {
      setShareButtonText("Share these notes");
    }, 2000);
  }, [
    selectedKey,
    selectedScale,
    selectedNumberOfNotes,
    selectedTempo,
    selectedInstrument,
    selectedOctaves,
    randomNotes,
    setShareButtonText,
  ]);
  const handleSaveClick = useCallback(
    () => SaveToMidi(randomNotes, selectedTempo),
    [randomNotes, selectedTempo]
  );

  return (
    <div className="buttons">
      <IconButton
        icon={NewNotesIcon}
        onClick={handleNewNotesClick}
        text="New notes"
      />
      <IconButton
        text={isPlaying ? "Pause" : "Play"}
        icon={isPlaying ? PauseIcon : PlayIcon}
        onClick={handlePlayPauseClick}
      />
      <IconButton
        onClick={handleResetClick}
        icon={ResetIcon}
        text="Reset inputs"
      />
      <IconButton
        onClick={handleShareClick}
        text={shareButtonText}
        icon={ShareIcon}
      />
      <IconButton
        onClick={handleSaveClick}
        icon={SaveIcon}
        text="Save as MIDI"
      />
    </div>
  );
};

export default React.memo(ButtonBlock);
