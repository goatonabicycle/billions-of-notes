import React from "react";
import KeySelect from "components/molecules/key-select";
import ScaleSelect from "components/molecules/scale-select";
import NumberOfNotesSelect from "components/molecules/number-of-notes-select";
import NumberOfEmptyNotesSelect from "components/molecules/number-of-empty-notes-select";

const Inputs: React.FC = () => {
  return (
    <div className="border-solid border-2 border-red-600">
      <KeySelect />
      <ScaleSelect />
      <NumberOfNotesSelect />
      <NumberOfEmptyNotesSelect />
    </div>
  );
};

export default React.memo(Inputs);
