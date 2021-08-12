import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AtomicBlockUtils } from "draft-js";
import MediaLib from "./MediaLib";

import image from './images/image.png';
 
const ImageOption = ({ editorState, onChange, config }) => {
  const [isMediaLibraryOpened, setIsMediaLibraryOpened] = useState(false);

  const toggleMediaLibrary = () => {
    setIsMediaLibraryOpened(!isMediaLibraryOpened);
  };

  const addImage = (url) => {
    const entityData = { src: url, width: "100%" };

    const entityKey = editorState
      .getCurrentContent()
      .createEntity("IMAGE", "MUTABLE", entityData)
      .getLastCreatedEntityKey();

    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    );

    setTimeout(() => onChange(newEditorState), 500);
  };

  return (
    <div className="rdw-inline-wrapper">
      <div onClick={toggleMediaLibrary} className="rdw-option-wrapper">
        <img src={image} className="rdw-option-wrapper-img"/>  
      </div>

      <MediaLib
        onToggle={toggleMediaLibrary}
        isOpen={isMediaLibraryOpened}
        onChange={(v) => {
          addImage(v.url);
        }}
      />
    </div>
  );
};

export default ImageOption;

