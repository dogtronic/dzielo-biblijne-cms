import React, {useState, useEffect, useCallback} from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageOption from './ImageOption';
import TabOption from './TabOption';
import TermOption from './TermOption';
import BibleOption from "./BibleOption";
import BibleDictionaryOption from './BibleDictionaryOption';

import bold from './images/bold.png'

import './styles.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const WysiwygEditor = ({onChange, name, value}) => {
  const [editorState, setEditorState] = useState(undefined);

  useEffect(() => {
    if(!editorState && value) {
      const content = value || '';
      const contentBlock = htmlToDraft(content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [value])

  const onChangeEditorState = useCallback((editorState) => {
    onChange({
      target: {
        value: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        name,
        type: 'textarea'
      }
    });
    setEditorState(editorState)
  }, [onChange])

  return (
    <Editor
      toolbar={{
        options: ["inline", "blockType", "list", "colorPicker", "link"],
        inline: bold
      }}
      toolbarCustomButtons={[<ImageOption />, <TabOption />, <TermOption />, <BibleDictionaryOption />, <BibleOption />]}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      editorState={editorState}
      onEditorStateChange={onChangeEditorState}
    />
  )
};

export default WysiwygEditor;

