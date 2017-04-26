import { FETCH_ELEMENT_DATA_SUCCESS, FETCH_ELEMENT_DATA_FAILURE } from './ElementAction';
import { get } from 'lodash';
const initialState = { data: [] };
const ElementReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ELEMENT_DATA_SUCCESS: {
      return { ...state, data: get(action, 'payload', []), shoutOut: 'success' };
    }
    case FETCH_ELEMENT_DATA_FAILURE : {
      return { ...state, shoutOut: 'failure' };
    }
    default:
      return state;
    
  }
};
export const elementDataSelector = state => state.ElementReducer.data;
export const fetchElementDataSelector = state => state.ElementReducer.shoutOut;
export default ElementReducer;
