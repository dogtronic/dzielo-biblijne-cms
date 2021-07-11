import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FontAwesome from 'react-fontawesome'
import { Button } from '@slate-editor/components'

import { insertInlineImage } from './ImageUtils'
import MediaLib from '../Wysiwyg/MediaLib';

class ImageButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMediaLibraryOpened: false
    }
  }

  toggleMediaLibrary = () => {
    this.setState({isMediaLibraryOpened: !this.state.isMediaLibraryOpened})
  }

  addImage = (onChange, value, url ) => {
    onChange(insertInlineImage({ change: value.change(), src: url }))
  }

  render () {
    const { value, onChange, className, style, signingUrl, outerState, type, onClickButton } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        <Button
          id={`slate-image-plugin-button-${outerState.uid}`}
          type={type}
          style={{ position: 'relative', ...style }}
          className={className}
          onClick={e => {
            this.toggleMediaLibrary()
          }}
        >
         
          <FontAwesome name='image' />
        </Button>

        <MediaLib
          onToggle={this.toggleMediaLibrary}
          isOpen={this.state.isMediaLibraryOpened}
          onChange={(v) => this.addImage(onChange, value, v.url)}
        />
      </div>
    )
  }
}

export default ImageButton
