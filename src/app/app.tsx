import React from "react";
import Button from "components/atoms/button";
import Inputs from "components/organisms/inputs";
import Debug from "components/molecules/debug";

const App: React.FC = () => {
  return (
    <main className="main-container">
      <div className="controls">
        <Inputs />
      </div>

      <div className="header">
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-4 text-pink-500">
          Billions of Notes
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 font-medium mb-2">
          This is V2. Figuring things out. Coming soon!
        </p>

        <a href="https://github.com/goatonabicycle/billions-of-notes">
          <Button>See what's up on Github</Button>
        </a>
      </div>

      <div className="output">
        <Debug />
      </div>
    </main>
  );
};

export default React.memo(App);
