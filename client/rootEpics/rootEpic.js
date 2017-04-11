import "rxjs";
import {combineEpics} from "redux-observable";
import {get} from "lodash";

const fetchElementListEpic = actions$ => {
  return actions$
    .filter((action) => {
      const {payload, type} = action;
      if (!payload) return false;
      const {name} = payload;
      return type === "@@api/FETCH_COMPLETE" && name === "getElementList";
    })
    .map(action => {
      return {
        type: "FETCH_ELEMENT_SUCCESS",
        element: action.payload.json.payload,
        payload: {},
      };
    });
};

const createElementEpic = actions$ => {
  return actions$
    .filter((action) => {
      const {payload, type} = action;
      if (!payload) return false;
      const {name} = payload;
      return type === "@@api/FETCH_COMPLETE" && name === "createElement";
    })
    .map(action => {
      return {
        type: "CREATE_ELEMENT_SUCCESS",
        newElement: action.payload.json.payload,
        payload: {},
      };
    });
}

const updateElemntEpic = actions$ => {
  return actions$
    .filter((action) => {
      const {payload, type} = action;
      if (!payload) return false;
      const {name} = payload;
      return type === "@@api/FETCH_COMPLETE" && name === "updateElement";
    })
    .map(action => {
      return {
        type: "UPDATE_ELEMENT_SUCCESS",
        id: action.payload.json.payload.id,
        payload: {},
        elementUpdated: action.payload.json.payload,
      };
    });
};

const deleteElementEpic = actions$ => {
  return actions$
    .filter((action) => {
      const {payload, type} = action;
      if (!payload) return false;
      const {name, body} = payload;
      if (!body) return false;
      const deletedID = JSON.parse(body).id;
      return type === "@@api/FETCH_COMPLETE" && name === "deleteElement" && deletedID;
    })
    .map(action => {
      const deletedID = JSON.parse(get(action, "payload.body", "{}")).id;
      return {
        type: "DELETE_ELEMENT_SUCCESS",
        id: deletedID,
        payload: {},
      };
    });
};

export default combineEpics(
  fetchElementListEpic,
  createElementEpic,
  updateElemntEpic,
  deleteElementEpic
);
