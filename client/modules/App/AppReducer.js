import {
  SHOW_HEADER,
  HIDE_HEADER,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  PAGE_LOAD_SUCCESS
} from './AppActions';

const initialState = {
  data: {
    showHeader: true,
    showSidebar: true,
    pageLoading: true,
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_HEADER :
      return {
        ...state, data: {
          ...state.data, showHeader: true,
        },
      };
    case SHOW_SIDEBAR :
      return {
        ...state, data: {
          ...state.data, showSidebar: true,
        },
      };
    case HIDE_HEADER :
      return {
        ...state, data: {
          ...state.data, showHeader: false,
        },
      };
    case HIDE_SIDEBAR:
      return {
        ...state, data: {
          ...state.data, showSidebar: false,
        },
      };
    default:
      return state;
  }
};

export const showHeaderSelector = state => state.AppReducer.data.showHeader;
export const showSidebarSelector = state => state.AppReducer.data.showSidebar;

export default AppReducer;
