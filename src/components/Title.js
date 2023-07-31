import React from "react";

import RainbowText from "./RainbowText";

const Title = ({ selectedTempo }) => {
  return (
    <div>
      <RainbowText
        text={"Billions"}
        tempo={selectedTempo}
      />
      <RainbowText
        text={" of "}
        tempo={selectedTempo}
      />
      <RainbowText
        text={"Notes!"}
        tempo={selectedTempo}
      />
    </div>
  );
};

export default Title;
