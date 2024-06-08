import React, { useState, useCallback } from "react";
import useStore from "../../store";
import Input from "../molecules/input";

interface TabProps {
  id: string;
  label: string;
  onSelect: (id: string) => void;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = ({ id, label, onSelect, isActive }) => (
  <button
    onClick={() => onSelect(id)}
    className={`px-4 py-2 ${
      isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
    }`}
  >
    {label}
  </button>
);

const InputTabs: React.FC = () => {
  const { inputStates, addInputState } = useStore();
  const [activeTabId, setActiveTabId] = useState<string | null>(
    inputStates[0]?.id || null
  );

  const handleTabSelect = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

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
