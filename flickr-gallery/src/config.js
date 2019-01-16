const appConfig = {
  base_url: `https://api.flickr.com/services/rest/`,
  params: {
    api_key: '3d66ed3090ab3c9ccb3d9271aafd25ab',
    method: 'flickr.photos.search',
    format: 'json',
    tags: 'safe',
    safe_search: 1,
    content_type: 7,
    privacy_filter: 1,
    accuracy: 6,
    generalSort: 'interestingness-desc',
    preciseSort: 'relevance',
    extras: 'url_o',
    nojsoncallback: 1,
    per_page: 15,
    parse_tags: 1,
    tags_mode: 'any',
    page: '',
  },
};

export default appConfig;
