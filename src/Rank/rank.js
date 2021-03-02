import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div style={{fontFamily: "monospace" }}>
      <div className="white f4">
        {`${name}, your current picture count is...`}
      </div>
      <div className="white f3">
        {`#${entries}`}
      </div>
    </div>
  );
};
export default Rank;
