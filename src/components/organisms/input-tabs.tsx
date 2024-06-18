import React, { useState, useCallback, useEffect } from "react";
import useStore from "../../store";
import Input from "../molecules/input";
import NotePlayer from "../molecules/note-player";

interface TabProps {
  id: string;
  label: string;
  onSelect: (id: string) => void;
  isActive: boolean;
  onRemove: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({
  id,
  label,
  onSelect,
  isActive,
  onRemove,
}) => (
  <div className="flex items-center">
    <button
      onClick={() => onSelect(id)}
      className={`px-4 py-2 ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {label}
    </button>
    <button onClick={() => onRemove(id)} className="ml-2 text-red-500">
      x
    </button>
  </div>
);

const InputTabs: React.FC = () => {
  const { inputStates, addInputState, removeInputState } = useStore();
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  useEffect(() => {
    if (inputStates.length > 0) {
      if (
        !activeTabId ||
        !inputStates.some((state) => state.id === activeTabId)
      ) {
        setActiveTabId(inputStates[0].id);
      }
    } else {
      setActiveTabId(null);
    }
  }, [inputStates, activeTabId]);

  const handleTabSelect = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  const handleTabRemove = useCallback(
    (id: string) => {
      removeInputState(id);
      if (activeTabId === id) {
        const remainingTabs = inputStates.filter((state) => state.id !== id);
        setActiveTabId(remainingTabs.length > 0 ? remainingTabs[0].id : null);
      }
    },
    [activeTabId, removeInputState, inputStates]
  );

  return (
    <div>
      <div className="flex space-x-2">
        {inputStates.map((inputState) => (
          <Tab
            key={inputState.id}
            id={inputState.id}
            label={`Input ${inputState.id}`}
            isActive={inputState.id === activeTabId}
            onSelect={handleTabSelect}
            onRemove={handleTabRemove}
          />
        ))}
        <button
          onClick={addInputState}
          className="px-4 py-2 bg-green-500 text-white"
        >
          Add New Input
        </button>
      </div>
      <div className="mt-4">
        {activeTabId && <TabContent id={activeTabId} />}
        {inputStates.map((inputState) => (
          <NotePlayer key={inputState.id} id={inputState.id} tempo={240} />
        ))}
      </div>
    </div>
  );
};

interface TabContentProps {
  id: string;
}

const TabContent: React.FC<TabContentProps> = ({ id }) => {
  return (
    <div className="p-4 border border-gray-500">
      <p>Currently selected input ID: {id}</p>
      <Input id={id} />
    </div>
  );
};

export default InputTabs;
