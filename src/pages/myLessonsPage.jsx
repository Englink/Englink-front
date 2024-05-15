import React, { useState } from "react";


const MyLessons = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => prevCounter -1)
  };

  return (
    <>
      <p>My Lessons</p>
      <button onClick={handleIncrement}>+ Counter</button>
      <button onClick={handleDecrement}>- Counter</button>
      <p>{counter}</p>
    </>
  );
};

export default MyLessons;


