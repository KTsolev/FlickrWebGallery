import Axios from 'axios';
import appConfig from '../config';

const fetchResults = Axios.create({
  baseURL: appConfig.base_url,
});

export default class PhotoServices {
  photoIds: []
  async loadPhotos(params) {
    let photos = [];
    let totalPages = 0;

    if (params.searchForTitle) {
      params = {
          api_key: appConfig.params.api_key,
          method: params.method || appConfig.params.method,
          format: appConfig.params.format,
          content_type: appConfig.params.content_type,
          sort: appConfig.params.preciseSort,
          extras: appConfig.params.extras,
          nojsoncallback: appConfig.params.nojsoncallback,
          per_page: params.maxResults || appConfig.params.per_page,
          page: params.page || appConfig.params.page,
          safe_search: appConfig.params.safe_search,
          text: params.searchForTitle,
          parse_tags: appConfig.params.parse_tags,
        };
    } else if(params.tags) {
      params = {
          api_key: appConfig.params.api_key,
          method: params.method || appConfig.params.method,
          format: appConfig.params.format,
          tags: params.tags || appConfig.params.tags,
          tags_mode: appConfig.tags_mode,
          content_type: appConfig.params.content_type,
          sort: appConfig.params.preciseSort,
          extras: appConfig.params.extras,
          nojsoncallback: appConfig.params.nojsoncallback,
          parse_tags: appConfig.params.parse_tags,
          per_page: params.per_page || appConfig.params.per_page,
          page: params.page || appConfig.params.page,
        };
    } else {
      params = {
          api_key: appConfig.params.api_key,
          method: params.method || appConfig.params.method,
          format: appConfig.params.format,
          tags: appConfig.params.tags,
          privacy_filter: appConfig.params.privacy_filter,
          content_type: appConfig.params.content_type,
          sort: appConfig.params.generalSort,
          extras: appConfig.params.extras,
          nojsoncallback: appConfig.params.nojsoncallback,
          per_page: params.per_page || appConfig.params.per_page,
          page: params.page || appConfig.params.page,
        };
    }

    console.log(params);

    try {
      let data = await fetchResults.get('/', { params })
      let jsonData = JSON.parse(JSON.stringify(data));

      this.photoIds = jsonData.data.photos.photo.filter((photo) => {
        if (photo.url_o) {
          return photo;
        }
      });

      photos = this.photoIds.map((photo) => this.loadPhotoInfo({
        method: 'flickr.photos.getInfo',
        photo_id: photo.id, }));

      totalPages = jsonData.data.photos.pages;
      console.log(this.photoIds, photos);

    } catch(error) { console.log(error); }

    return {
      photos: this.photoIds,
      totalPages,
    };
  }

  async loadPhotoInfo(params) {
    params = {
        api_key: appConfig.params.api_key,
        method: params.method || appConfig.params.method,
        photo_id: params.photo_id,
        format: appConfig.params.format,
        nojsoncallback: appConfig.params.nojsoncallback,
      };

    try {
      let data = await fetchResults.get('/', { params });
      let jsonData = JSON.parse(JSON.stringify(data));

      return this.photoIds.map((item) => {
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
    } catch (error) {
      console.log(error)
    }
  }
};
