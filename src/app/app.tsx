import { useState, ChangeEvent } from "react";
import Button from "components/atoms/button";
import Select from "components/atoms/select";

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("option1");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log("Selected option:", event.target.value);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-pink-500">
          Billions of Notes
        </h1>
        <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
          This is V2. Figuring things out. Coming soon!
        </p>

        <div className="p-4 bg-gray-300">
          <Select
            id="example-select"
            name="example"
            label="Thing"
            onChange={handleSelectChange}
            selectedValue={selectedValue}
            options={options}
          />
          {selectedValue && <p>Selected: {selectedValue}</p>}
        </div>
      </header>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto ">
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
    </main>
  );
}

export default App;
