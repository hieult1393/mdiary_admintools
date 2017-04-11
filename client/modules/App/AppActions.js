export const SHOW_HEADER = 'SHOW_HEADER';
export const HIDE_HEADER = 'HIDE_HEADER';
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';

export function activeHeader() {
  return {
    type: SHOW_HEADER,
    payload: true,
  };
}

export function activeSidebar() {
  return {
    type: SHOW_SIDEBAR,
    payload: true,
  };
}

export function deActiveHeader() {
  return {
    type: HIDE_HEADER,
    payload: false,
  };
}

export function deActiveSidebar() {
  return {
    type: HIDE_SIDEBAR,
    payload: false,
  };
}



