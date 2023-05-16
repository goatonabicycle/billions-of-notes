import React, { useState, useMemo } from "react";
import { Scale, Mode } from "tonal";

import Select from "./components/Select";
import "./App.css";

// https://github.com/tonaljs/tonal

const mapToSelectOptions = (items) => {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
};

function App() {
  const scales = Mode.names();

  const [selectedKey, setSelectedKey] = useState("C");
  const [selectedScale, setSelectedScale] = useState("ionian");

  const keyOptions = useMemo(() => {
    const keys = [
      "A",
      "Bb",
      "B",
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
    ];
    return mapToSelectOptions(keys);
  }, []);
  const scaleOptions = useMemo(() => mapToSelectOptions(scales), [scales]);

  const notesForKeyAndScale = Scale.get(
    `${selectedKey} ${selectedScale}`
  ).notes;

  return (
    <div className="App">
      <Select
        id="keySelect"
        label="Select a key:"
        options={keyOptions}
        onChange={(value) => {
          setSelectedKey(value);
        }}
        selectedValue={selectedKey}
      />
      <Select
        id="scaleSelect"
        label="Select a scale:"
        options={scaleOptions}
        onChange={(value) => {
          setSelectedScale(value);
        }}
        selectedValue={selectedScale}
      />
      <br />
      selectedKey: {selectedKey}
      <br />
      selectedScale: {selectedScale}
      <br />
      notesForKeyAndScale: {notesForKeyAndScale}
    </div>
  );
}

export default App;
