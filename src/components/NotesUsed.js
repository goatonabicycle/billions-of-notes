import React, { useState } from "react";
import Modal from "./Modal.js";
import Select from "./Select";
import "./NotesUsed.css";
import IconButton from "./IconButton";
import { PauseIcon } from "./Icons";

const NotesUsed = ({
  randomNotes,
  currentIndex,
  setRandomNotes,
  notesInScale,
  selectedOctaves,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteForEditing, setSelectedNoteForEditing] = useState(null);

  const handleNoteChange = (newNote, newOctave) => {
    const newRandomNotes = [...randomNotes];
    newRandomNotes[selectedNoteForEditing] = `${newNote}${newOctave}`;
    setRandomNotes(newRandomNotes);
  };

  const handleEmptyNote = () => {
    const newRandomNotes = [...randomNotes];
    newRandomNotes[selectedNoteForEditing] = "";
    setRandomNotes(newRandomNotes);
    setIsModalOpen(false);
  };

  return (
    <div className="notes-used">
      {randomNotes.map((note, i) => {
        const isCurrentNote = i === currentIndex;
        return (
          <div key={i}>
            <div
              className={isCurrentNote ? "note active" : "note"}
              onClick={() => {
                setSelectedNoteForEditing(i);
                setIsModalOpen(true);
              }}>
              {note || ""}
            </div>
          </div>
        );
      })}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Select
          id="noteSelect"
          label="Note"
          options={notesInScale.map((note) => ({ value: note, label: note }))}
          selectedValue={
            selectedNoteForEditing !== null
              ? randomNotes[selectedNoteForEditing]?.slice(0, -1) ||
                notesInScale[0]
              : ""
          }
          onChange={(event) => {
            const newOctave =
              randomNotes[selectedNoteForEditing]?.slice(-1) ||
              selectedOctaves[0];
            handleNoteChange(event.target.value, newOctave);
          }}
        />
        <Select
          id="octaveSelect"
          label="Octave"
          options={selectedOctaves.map((octave) => ({
            value: octave,
            label: octave.toString(),
          }))}
          selectedValue={
            randomNotes[selectedNoteForEditing]?.slice(-1) || selectedOctaves[0]
          }
          onChange={(event) => {
            const newNote =
              randomNotes[selectedNoteForEditing]?.slice(0, -1) ||
              notesInScale[0];
            handleNoteChange(newNote, event.target.value);
          }}
        />
        <br />
        <IconButton
          icon={PauseIcon}
          onClick={handleEmptyNote}
          text="Set to empty"
        />
      </Modal>
    </div>
  );
};

export default NotesUsed;
