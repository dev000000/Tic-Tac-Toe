import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);
  const handleClick = () => {
    if (value === null) {
      setValue("X");
    } else {
      setValue(null);
    }
  };
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
