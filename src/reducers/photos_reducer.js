import {
  ADD_PICTURE,
  FETCH_PHOTO
} from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_PICTURE:
      return [ action.payload, ...state ];
    case FETCH_PHOTO:
      return [ ...action.payload ];
  }

  return state;
}
