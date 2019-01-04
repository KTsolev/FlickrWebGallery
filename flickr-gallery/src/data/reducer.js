const initialState = {
  photos: [],
  isLoading: false,
  loadMore: false,
  limit: 10,
  offset: 1,
};

export default function PhotosReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return Object.assign({}, state, {
        photos: action.payload,
      });
    default:
      return state;
  }
}
