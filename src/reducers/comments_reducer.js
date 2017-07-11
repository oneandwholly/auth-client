import {
  FETCH_COMMENT
} from '../actions/types';

export default (state = {}, action) => {
  let newState = {};
  switch(action.type) {
    case FETCH_COMMENT:
      if(action.payload.data.length === 0) {
        newState[action.payload.photo_id] = [];
        Object.assign(newState, state);
        console.log('newstate1', newState);
        return newState;
      } else {
        console.log('data in payload', action.payload.photo_id ,action.payload.data);
        newState[action.payload.photo_id] = action.payload.data;
        console.log(newState);
        let obj = Object.assign({}, state, newState);
        return obj;
      }
  }

  return state;
}
