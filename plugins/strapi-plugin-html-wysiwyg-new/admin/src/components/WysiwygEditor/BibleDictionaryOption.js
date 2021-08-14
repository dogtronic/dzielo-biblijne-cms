import React, { Component, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, Modifier, } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';
import BibleDictionaryLink from './BibleDictionaryLink';

import bookmark from './images/bookmark.png'

const BibleDictionaryOption = ({ editorState, onChange, config }) => {
  const [isMediaLibraryOpened, setIsMediaLibraryOpened] = useState(false);

  const toggleMediaLibrary = () => {
    setIsMediaLibraryOpened(!isMediaLibraryOpened);
  }

  const getCurrentValues = () => {
    const currentEntity = getSelectionEntity(editorState);

    const contentState = editorState.getCurrentContent();
    const currentValues = {};
    if (
      currentEntity &&
      contentState.getEntity(currentEntity).get('type') === 'LINK'
    ) {
      currentValues.link = {};
      const entityRange =
        currentEntity && getEntityRange(editorState, currentEntity);
      currentValues.link.target =
        currentEntity && contentState.getEntity(currentEntity).get('data').url;
      currentValues.link.targetOption =
        currentEntity &&
        contentState.getEntity(currentEntity).get('data').targetOption;
      currentValues.link.title = entityRange && entityRange.text;
    }
    currentValues.selectionText = getSelectionText(editorState);

    return currentValues;
  };

  const addLink = (value) => {

    const currentValues = getCurrentValues();
    value.label = currentValues.selectionText || value.label;

    let selection = editorState.getSelection();
    

    const currentEntity = getSelectionEntity(editorState);

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      const isBackward = selection.getIsBackward();
      if (isBackward) {
        selection = selection.merge({
          anchorOffset: entityRange.end,
          focusOffset: entityRange.start,
        });
      } else {
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end,
        });
      }
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', {
        url: 'bible-dictionary/' + value.value,
      })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${value.label}`,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    let newEditorState = EditorState.push(
      editorState,
      contentState,
      'insert-characters'
    );

    // insert a blank space after link
    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + value.label.length,
      focusOffset: selection.get('anchorOffset') + value.label.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      '',
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
    onChange(
      EditorState.push(newEditorState, contentState, 'insert-characters')
    );
    setIsMediaLibraryOpened(false);
  };

  return (
    <div className="rdw-inline-wrapper">
      <div onClick={toggleMediaLibrary}  className="rdw-option-wrapper">
        <img src={bookmark} className="rdw-option-wrapper-img"/>
      </div>

      <BibleDictionaryLink isOpen={isMediaLibraryOpened} onChange={addLink} toggle={toggleMediaLibrary}/>
    </div>
  );
  
}

export default BibleDictionaryOption;