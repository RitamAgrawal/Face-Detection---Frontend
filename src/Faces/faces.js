import React from "react";
import "./faces.css";

const Faces = ({ imageUrl, box }) => {
  return (
    <div className= " ma center">
      <div className='absolute'>
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="400px"
          height="auto"
        />
        {box.map((item) => (
          <div
            className="bounding-box"
            style={{
              top: item.topRow,
              right: item.rightCol,
              bottom: item.bottomRow,
              left: item.leftCol,
              border: `3px solid #${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default Faces;
