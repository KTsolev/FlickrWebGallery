import React, { Component } from 'react';
import preload from '../../images/preload2.png';
import Image from '../ImageComponent/Image';
import Tag from '../TagComponent/Tag';
import './PhotoTile.scss';

const ReactSafeHtml = require('react-safe-html');

class PhotoTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this._removeTags = this._removeTags.bind(this);
    this._toggleExpand = this._toggleExpand.bind(this);
  }

  _removeTags(event) {
    const tagToRemove = event.target.parentNode.childNodes[0].innerText;
    this.props.photo.tags = this.props.photo.tags.filter(tag => tag.raw !== tagToRemove);
    this.forceUpdate();
  }

  _toggleExpand(event) {
    this.setState({ expanded: !this.state.expanded });
    event.target.parentNode.classList.toggle('photo-tile__tags--epxanded', this.state.expanded);
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
                rel="noopener noreferrer"
                className="header__title">
                {this.props.photo.title}
              </a>
              <a href={this.props.photo.ownerUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="header__author">
               by {this.props.photo.owner}
              </a>
            </div>
          <div className="image__description">
            <ReactSafeHtml html={this.props.photo.description} />
          </div>
          <div className="photo-tile__tags">
            <span className="tags__label">Tags:</span>
            {this.props.photo.tags ?
              this.props.photo.tags.map((tag, index) =>
              <Tag
              key={index}
              tagName={tag.raw}
              iconClickHandler={this._removeTags} />)
              : 'no tags'}
            {this.props.photo.tags && this.props.photo.tags.length > 4 ?
              <span
                className="tags__expand-button"
                onClick={this._toggleExpand}>
                . . .
                </span> : null}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default PhotoTile;
