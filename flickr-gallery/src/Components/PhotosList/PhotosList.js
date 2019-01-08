import React, { Component } from 'react';
import './PhotosList.scss';
import PhotoTile from '../PhotoTile/PhotoTile';
import Spinner from '../SpinnerComponent/Spinner';
import fetchResults from '../../data/store';

class PhotosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLoading: true,
      error: '',
      hasMore: true,
      page: 1,
      totalPages: 100,
    };

    this._getPhotos = this._getPhotos.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);

  }

  _scrollHandler() {
    const {
      _getPhotos,
      state: {
        error,
        isLoading,
        hasMore,
        totalPages,
      },
    } = this;

    if (error || isLoading || !hasMore) {
      return;
    }

    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      console.log('at bottom', totalPages);
      this.setState({ page: this.state.page + 1, hasMore: this.state.page < totalPages });
      _getPhotos();
    }
  }

  _getPhotos() {
    console.log(fetchResults);
    this.setState({ isLoading: true });
    let url = 'https://api.flickr.com/services/rest/?api_key=3d66ed3090ab3c9ccb3d9271aafd25ab';
    let params = `&method=flickr.photos.search&format=json&tags=safe&content_type=1&privacy_filter=1&accuracy=6&sort=date-posted-asc&extras=url_o&nojsoncallback=1&per_page=15&page=${this.state.page}`;

    fetchResults(`${url}${params}`)
    .then(data => {
      let jsonData = JSON.parse(JSON.stringify(data));
      let photoIds = jsonData.data.photos.photo.filter((photo) => {
        if (photo.url_o) {
          return photo;
        }
      });

      photoIds.map(photo => this._getPhotosData(photo.id));

      this.setState({
        totalPages: jsonData.data.photos.pages,
        photos: [...this.state.photos, ...photoIds],
      });

      console.log(this.state);
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  _getPhotosData(id) {

    let url = 'https://api.flickr.com/services/rest/?api_key=3d66ed3090ab3c9ccb3d9271aafd25ab';
    let params = `&method=flickr.photos.getInfo&photo_id=${id}&format=json&nojsoncallback=1`;

    fetchResults(`${url}${params}`)
    .then(data => {
      let jsonData = JSON.parse(JSON.stringify(data));

      let newPhotos = this.state.photos.map((item) => {

        if (item.id === jsonData.data.photo.id) {
          return Object.assign(item, {
            description: jsonData.data.photo.description._content,
            title: jsonData.data.photo.title._content,
            tags: jsonData.data.photo.tags.tag,
            owner: jsonData.data.photo.owner.username,
            ownerUrl: `https://www.flickr.com/people/${jsonData.data.photo.owner.nsid}`,
            pageUrl: jsonData.data.photo.urls.url[0]._content,
          });
        }
      });

      this.setState({ isLoading: false });
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  componentWillMount() {
    this._getPhotos();
    window.addEventListener('scroll', this._scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._scrollHandler);
  }

  render() {
    return (
      <div className="list-items">
        {this.state.photos.map((photo, index) => <PhotoTile key={index} photo={photo} />)}
        {this.state.error ? <span className="error-message">{this.state.error}</span> : null}
        {this.state.isLoading ? <Spinner /> : null }
      </div>
    );
  }
}

export default PhotosList;
