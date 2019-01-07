import React, { Component } from 'react';
import './Image.scss';

class Image extends Component {

  constructor(props) {
    super(props);
    this.ironImageHd = null;

    this.setLoadedImgtRef = element => {
      this.ironImageHd = element;
    };
  }

  render() {
    return (
      <div className="iron-image-container">
        <div
          className="iron-image-loaded"
          ref={this.setLoadedImgtRef}>
          <img
            src={this.props.srcLoaded}
            style={{ display: 'none' }}
            onLoad={() => {
              this.ironImageHd.setAttribute(
                'style',
                `background-image: url('${this.props.srcLoaded}')`
              );
              this.ironImageHd.classList.add('iron-image-fade-in');
            }}
            alt='user-img' />
        </div>
        <div
          className="iron-image-preload"
          style={{ backgroundImage: `url('${this.props.srcPreload}')` }}>
        </div>
      </div>
    );
  }

}

export default Image;
