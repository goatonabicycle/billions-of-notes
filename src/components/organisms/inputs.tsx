import React from "react";
import KeySelect from "components/molecules/key-select";
import ScaleSelect from "components/molecules/scale-select";
import NumberOfNotesSelect from "components/molecules/number-of-notes-select";

const Inputs: React.FC = () => {
  return (
    <>
      <KeySelect />
      <ScaleSelect />
      <NumberOfNotesSelect />
    </>
  );
};

export default React.memo(Inputs);
