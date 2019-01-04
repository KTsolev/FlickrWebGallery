import React, { Component } from 'react';
import './PhotosList.scss';
import PhotoTile from '../PhotoTile/PhotoTile';
import axios from 'axios';

class PhotosList extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      isLoading: true,
    };

    this._getPhotos = this._getPhotos.bind(this);
  }

  _getPhotos() {
    this.setState({ isLoading: true });
    let url = 'https://api.flickr.com/services/rest/?api_key=3d66ed3090ab3c9ccb3d9271aafd25ab';
    let params = `&method=flickr.photos.search&format=json&safe_search=1&tags=safe&privacy_filter=1&nojsoncallback=1&per_page=10&page=1`;

    axios
    .get(`${url}${params}`)
    .then(data => {
      let jsonData = JSON.parse(JSON.stringify(data));

      jsonData.data.photos.photo.map(photo => {
        this._getPhotosData(photo.id);
      });
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  _getPhotosData(id) {
    let url = 'https://api.flickr.com/services/rest/?api_key=3d66ed3090ab3c9ccb3d9271aafd25ab';
    let params = `&method=flickr.photos.getInfo&photo_id=${id}&format=json&nojsoncallback=1`;

    axios
    .get(`${url}${params}`)
    .then(data => {
      let jsonData = JSON.parse(JSON.stringify(data));
      this.state.photos.push({
            id: jsonData.data.photo.id,
            title: jsonData.data.photo.title,
            owner: jsonData.data.photo.owner,
            description: jsonData.data.photo.description,
            tags: jsonData.data.photo.tags,
            url: jsonData.data.photo.urls.url,
          });
      this.setState({ isLoading: false });
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  componentWillMount() {
    this._getPhotos();
  }

  render() {
    return (
      <div className="list-items">
      {!this.state.isLoading ?
        this.state.photos.map((photo, index) => <PhotoTile key={index} photo={photo} />) :
        <p>Loading...</p>
      }
      </div>
    );
  }
}

export default PhotosList;
