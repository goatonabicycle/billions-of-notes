import React, { useState, useEffect } from "react";

const LoopComponent = ({ list, bpm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
    }, calculateInterval(bpm));

    return () => {
      clearInterval(interval);
    };
  }, [list, bpm]);

  const calculateInterval = (bpm) => {
    const millisecondsPerBeat = 60000 / bpm;
    return millisecondsPerBeat;
  };

  return <div>{list[currentIndex]}</div>;
};

export default LoopComponent;
