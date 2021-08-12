import React, { Component } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, Modifier } from "draft-js";

import indent from './images/indent.png'

class TabOption extends Component {
  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "\t",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div className="rdw-inline-wrapper">
        <div onClick={this.addStar} className="rdw-option-wrapper">
          <img src={indent} className="rdw-option-wrapper-img"/>
        </div>
      </div>
    );
  }
}

export default TabOption;

