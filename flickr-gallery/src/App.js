import React, { Component } from 'react';
import PhotosList from './Components/PhotosList/PhotosList';
import Filters from './Components/Filters/Filters';
import PhotoServices from './data/PhotoService';
import Spinner from './Components/SpinnerComponent/Spinner';
import _ from 'underscore';
import axios from 'axios';
import './App.scss';

const photoService = new PhotoServices();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      showFilters: false,
      isLoading: true,
      error: '',
      hasMore: true,
      page: 1,
      totalPages: 100,
      params: {},
    };

    this.toggleFilters = this.toggleFilters.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);
    this._getPhotos = this._getPhotos.bind(this);
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  updateParams(param) {
    let params = Object.assign({}, this.state.params, param);
    if (!_.isEqual(this.state.params, params)) {
      this.setState({ photos: [], params, });
      this._getPhotos();
    }
  }

  _getPhotos() {
    this.setState({ isLoading: true });

    photoService.loadPhotos({
        page: this.state.page,
        searchForTitle: this.state.params.searchForTitle,
        per_page: this.state.params.resultsPerPage,
        tags: this.state.params.tags,
      })
      .then((data) => {
      this.setState({
        totalPages: data.totalPages,
        photos: [...this.state.photos, ...data.photos],
        page: this.state.page + 1,
      });
    })
    .catch(error => this.setState({ error }))
    .finally(() => this.setState({ isLoading: false }));
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
      this.setState({ page: this.state.page + 1, hasMore: this.state.page < totalPages });
      _getPhotos();
    }
  }

  componentWillMount() {
    this._getPhotos();
    window.addEventListener('scroll', this._scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._scrollHandler);
  }

  render() {
    console.log('photos', this.state);
    return (
      <div className="App">
      <div className={this.state.showFilters ? 'modal' : 'modal hidden'}>
        <div className="filters-inner">
          <Filters updateParams={this.updateParams} closeFilters={this.toggleFilters} />
        </div>
      </div>
      <div
        className={!this.state.showFilters ? 'filters' : 'filters hidden'}
        onClick={this.toggleFilters}>
        <i className="fas fa-search toggle-filters"></i>
      </div>
        <main className="list-holder">
          <PhotosList photos={this.state.photos} />
        </main>
        {this.state.isLoading ? <Spinner /> : null }
        {this.state.error ? <span className="error-message">{this.state.error}</span> : null}
      </div>
    );
  }
}

export default App;
