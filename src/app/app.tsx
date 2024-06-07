import React from "react";
import Button from "components/atoms/button";
import KeySelect from "components/molecules/key-select";
import Debug from "components/molecules/debug";

const App: React.FC = () => {
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-pink-500">
          Billions of Notes
        </h1>
        <p className="max-w-screen-lg text-lg sm:text-xl text-gray-300 font-medium mb-10 sm:mb-11">
          This is V2. Figuring things out. Coming soon!
        </p>
        <KeySelect />
      </header>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="sm:flex sm:space-x-6 space-y-4 sm:space-y-0 items-center">
          <a href="https://github.com/goatonabicycle/billions-of-notes">
            <Button>See what's up on Github</Button>
          </a>
        </div>
      </section>
      <footer className="pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto text-center sm:text-right text-gray-400 font-bold">
        <a href="https://github.com/goatonabicycle">
          Rowan Deysel @ {new Date().getFullYear()}
        </a>
      </footer>
      <Debug />
    </main>
  );
};

export default React.memo(App);
