import React from "react";
import "./imageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit, onHandleFocus }) => {
  return (
    <div className="pa1">
      <p className="white f5">
        This Smart App will detect faces in your pictures. Give it a try!!!
      </p>
      <div className="pa3 br3 shadow-2 form center">
        <input
          className="f5 br2 w-70"
          type="text"
          onClick={onHandleFocus}
          onChange={onInputChange}
        />
        <button
          className="w-30 br2 grow f5 link ph3 pv2 dib bg-light-green white"
          onClick={onPictureSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};
export default ImageLinkForm;
