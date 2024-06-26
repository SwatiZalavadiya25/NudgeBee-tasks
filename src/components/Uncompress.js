import { useState } from "react";

const UnCompress = () => {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");

  const handleUncompressEvent = () => {
    let currentNum = 0;
    let stringsList = [];
    let currentStr = "";

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      if (char >= "0" && char <= "9") {
        currentNum = currentNum * 10 + parseInt(char);
      } else if (char === "(") {
        stringsList.push([currentStr, currentNum]);
        currentStr = "";
        currentNum = 0;
      } else if (char === ")") {
        console.log(stringsList);
        let [prevStr, num] = stringsList.pop();
        currentStr = prevStr + currentStr.repeat(num);
      } else {
        currentStr += char;
      }
    }
    setOutputString(currentStr);
  };

  return (
    <div className="uncompress-container">
      <input
        name="inputString"
        value={inputString}
        placeholder="Enter input string"
        onChange={(e) => setInputString(e.target.value)}
      />
      <button
        className="uncompress-btn"
        type="button"
        onClick={handleUncompressEvent}
        disabled={inputString === ""}
      >
        Uncompress
      </button>
      {outputString && <h3>Output: {outputString}</h3>}
    </div>
  );
};

export default UnCompress;
