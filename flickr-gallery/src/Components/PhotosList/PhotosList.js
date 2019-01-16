import React, { Component } from 'react';
import './PhotosList.scss';
import PhotoTile from '../PhotoTile/PhotoTile';

class PhotosList extends Component {
  render() {
    return (
      <div className="list-header">
        <div className="list-items">
          {this.props.photos.map((photo, index) => <PhotoTile key={index} photo={photo} />)}
        </div>
      </div>
    );
  }
}

export default PhotosList;
