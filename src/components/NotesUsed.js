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
  tieTogether, // Adding tieTogether prop
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

  const groupNotes = () => {
    const groupedNotes = [];
    randomNotes.forEach((note, i) => {
      if (!tieTogether || i === 0 || note !== randomNotes[i - 1]) {
        groupedNotes.push({ note: note, count: 1 });
      } else if (tieTogether && note === randomNotes[i - 1]) {
        groupedNotes[groupedNotes.length - 1].count++;
      }
    });
    return groupedNotes;
  };

  const processedNotes = groupNotes();

  return (
    <div className="notes-used">
      {processedNotes.map((item, i) => {
        const isCurrentNote = currentIndex === i;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div
              className={isCurrentNote ? "note active" : "note"}
              style={{ minWidth: `${30 * item.count}px` }} // Adjust minWidth based on count
              onClick={() => {
                setSelectedNoteForEditing(i);
                setIsModalOpen(true);
              }}>
              {item.note}
              {item.count > 1 && ` (x${item.count})`}{" "}
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
