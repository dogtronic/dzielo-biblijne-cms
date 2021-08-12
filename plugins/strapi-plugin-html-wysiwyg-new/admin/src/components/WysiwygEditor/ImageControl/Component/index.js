import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MediaLib from '../../../Wysiwyg/MediaLib';


import './styles.css';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    imgSrc: '',
    dragEnter: false,
    uploadHighlighted:
    false,
    showImageLoading: false,
    height: 200,
    width: 200,
    alt: '',
    isMediaLibraryOpened: false
  };

  toggleMediaLibrary = () => {
    this.setState({isMediaLibraryOpened: !this.state.isMediaLibraryOpened})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded && !this.props.expanded) {
      this.setState({
        imgSrc: '',
        dragEnter: false,
        uploadHighlighted: false,
        showImageLoading: false,
        height: 200,
        width: 200,
        alt: '',
      });
    }
  }

  onDragEnter = event => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  onImageDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });

    // Check if property name is files or items
    // IE uses 'files' instead of 'items'
    let data;
    let dataIsItems;
    if (event.dataTransfer.items) {
      data = event.dataTransfer.items;
      dataIsItems = true;
    } else {
      data = event.dataTransfer.files;
      dataIsItems = false;
    }
    for (let i = 0; i < data.length; i += 1) {
      if (
        (!dataIsItems || data[i].kind === 'file') &&
        data[i].type.match('^image/')
      ) {
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.uploadImage(file);
      }
    }
  };

  showImageUploadOption = () => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addImageFromState = () => {
    const { imgSrc, alt } = this.state;
    let { height, width } = this.state;
    const { onChange } = this.props;
    if (!isNaN(height)) {
      height += 'px';
    }
    if (!isNaN(width)) {
      width += 'px';
    }
    console.log(imgSrc, height, width, alt)
    console.log('http://localhost:1337/uploads/biblia_056346a4c2.jpg', '200px', '200px', '')
    // onChange(imgSrc, height, width, alt);

    this.props.onChange('http://localhost:1337/uploads/biblia_056346a4c2.jpg', '200px', '200px', '')
  };

  showImageURLOption = () => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  toggleShowImageLoading = () => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  updateValue = event => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  selectImage = event => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  uploadImage = file => {
    this.toggleShowImageLoading();
    // const { uploadCallback } = this.props.config;
    // uploadCallback(file)
    //   .then(({ data }) => {
    //     this.setState({
    //       showImageLoading: false,
    //       dragEnter: false,
    //       imgSrc: data.link || data.url,
    //     });
    //     this.fileUpload = false;
    //   })
    //   .catch(() => {
    //     this.setState({
    //       showImageLoading: false,
    //       dragEnter: false,
    //     });
    //   });
  };

  fileUploadClick = event => {
    this.fileUpload = true;
    event.stopPropagation();
  };

  stopPropagation = event => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  renderAddImageModal() {
    const {
      imgSrc,
      uploadHighlighted,
      showImageLoading,
      dragEnter,
      height,
      width,
      alt,
    } = this.state;
    const {
      // config: {
      //   popupClassName,
      //   uploadCallback,
      //   uploadEnabled,
      //   urlEnabled,
      //   previewImage,
      //   inputAccept,
      //   alt: altConf,
      // },
      doCollapse,
      translations,
    } = this.props;
    return (
      <div
        className={classNames('rdw-image-modal')}
        onClick={this.stopPropagation}
      >
        <div className="rdw-image-modal-header">
         
        
            <span
              onClick={this.showImageURLOption}
              className="rdw-image-modal-header-option"
            >
              {translations['components.controls.image.byURL']}
              <span
                className={classNames('rdw-image-modal-header-label', {
                  'rdw-image-modal-header-label-highlighted': !uploadHighlighted,
                })}
              />
            </span>
         
        </div>
     
          <div className="rdw-image-modal-url-section">
            <input
              className="rdw-image-modal-url-input"
              placeholder={translations['components.controls.image.enterlink']}
              name="imgSrc"
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={imgSrc}
            />
            <span className="rdw-image-mandatory-sign">*</span>
          </div>
      
        <div className="rdw-image-modal-size">
          &#8597;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            className="rdw-image-modal-size-input"
            placeholder="Height"
          />
          <span className="rdw-image-mandatory-sign">*</span>
          &nbsp;&#8596;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            className="rdw-image-modal-size-input"
            placeholder="Width"
          />
          <span className="rdw-image-mandatory-sign">*</span>
        </div>
        <span className="rdw-image-modal-btn-section">
          <button
            className="rdw-image-modal-btn"
            onClick={this.addImageFromState}
         
          >
            {translations['generic.add']}
          </button>
          <button className="rdw-image-modal-btn" onClick={doCollapse}>
            {translations['generic.cancel']}
          </button>
        </span>
        {showImageLoading ? (
          <div className="rdw-image-modal-spinner">
            {/* <Spinner /> */}
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }

  render() {
    const {
  
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-image-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-image-control"
      >
        <span onClick={this.toggleMediaLibrary}>asd</span>
        {/* <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.image.image']}
        >
          <img src={icon} alt="" />
        </Option> */}
        {expanded ? this.renderAddImageModal() : undefined}

        <MediaLib
          onToggle={this.toggleMediaLibrary}
          isOpen={this.state.isMediaLibraryOpened}
          onChange={(v) => {setTimeout(() => {console.log(v); this.addImageFromState();}, 300)}}
        />
      </div>
    );
  }
}

export default LayoutComponent;