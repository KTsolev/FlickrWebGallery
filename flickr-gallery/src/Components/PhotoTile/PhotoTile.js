import React, { Component } from 'react';
import preload from '../../images/preload2.png';
import Image from '../ImageComponent/Image';
import Tag from '../TagComponent/Tag';
import './PhotoTile.scss';

const ReactSafeHtml = require('react-safe-html');

class PhotoTile extends Component {
  constructor(props) {
    super(props);

    this.removeTags = this.removeTags.bind(this);
  }

  removeTags(elem) {
    const tagToRemove = elem.target.parentNode.childNodes[0].innerText;
    console.log(elem.target.parentNode);
    console.log(tagToRemove);
    this.props.photo.tags = this.props.photo.tags.filter(tag => tag.raw !== tagToRemove);
    this.forceUpdate();
  }

  render() {
    return (
      <div className="photo-tile">
        <div className="photo-tile photo-tile--inner">
          <Image srcPreload={preload} srcLoaded={this.props.photo.url_o}/>
          <div className="image-info">
            <div className="image__header">
              <a href={this.props.photo.pageUrl}
                target="_blank"
                className="header__title">
                {this.props.photo.title}
              </a>
              <a href={this.props.photo.ownerUrl}
               target="_blank"
               className="header__author">
               by {this.props.photo.owner}
              </a>
            </div>
          <div className="image__description">
            <ReactSafeHtml html={this.props.photo.description} />
          </div>
          <div className="photo-tile__tags">
            <span>Tags:</span>
            {this.props.photo.tags ?
              this.props.photo.tags.map((item, index) =>
              <Tag key={index} tagName={item.raw} iconClickHandler={this.removeTags} />)
              : 'no tags'}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default PhotoTile;
