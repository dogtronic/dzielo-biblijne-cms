import React, { Component } from 'react'
import classnames from 'classnames'


// FIXME: Needs to handle assets files to work with SSR
if (require('exenv').canUseDOM) require('./ImageNode.css')

class ImageNode extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalActive: false }
  }

  render() {
    const { isModalActive } = this.state
    const {
      node,
      attributes,
      readOnly,
      isSelected,
      editor: {
        onChange,
        props: { value }
      }
    } = this.props

    return (
      <span>
        <div className={classnames('image-node--container', { readonly: readOnly })}>
          <img
            // {...attributes}
            role="presentation"
            className={`image-node`}
            src={node.data.get('src')}
            title={node.data.get('title')}
            alt={node.data.get('title')}
          />
        </div>
      </span>
    )
  }
}

export default ImageNode
