import {
  ADD_PICTURE
} from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_PICTURE:
      return [ action.payload, ...state ];
  }

  return state;
}
