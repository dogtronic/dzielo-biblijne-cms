import React from "react";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageOption from './ImageOption';
import TabOption from './TabOption';
import TermOption from './TermOption';
import BibleOption from "./BibleOption";

import bold from './images/bold.png'

import './styles.css';

const WysiwygEditor = () => (
  <Editor
    toolbar={{
      options: ["inline", "blockType", "list", "colorPicker", "link"],
      inline: bold
    }}
    toolbarCustomButtons={[<ImageOption />, <TabOption />, <TermOption />, <BibleOption />]}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
  />
);

export default WysiwygEditor;

