import React, { Component } from 'react';
import './PhotoTile.scss';

class PhotoTile extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      title: props.photo.title._content || 'no title availlable',
      description: props.photo.description._content || 'no description availlable',
      author: props.photo.owner.username || 'no author availlable',
      url: props.photo.url[0]._content || 'no image availlable',
      tags: props.photo.tags.tag || [],
    };
  }

  render() {
    console.log(this.state)
    return (
      <div className="photo-tile">
        <div className="photo-tile__image-holder">
          <img className="photo-tile__image" src={require(`${this.state.url}`)} alt="usare_img"/>
        </div>
        <div className="image-info">
          <span className="image__title">{this.state.title}</span>
          <span className="image__author">{this.state.author}</span>
        </div>
        <div className="image__description">
          <p>{this.state.description}</p>
        </div>
        <div className="photo-tile__tags">
        </div>
      </div>
    );
  }
}

export default PhotoTile;
