import client from "../../utilities/apiClient";

const MODULE_NAME = "FETCH_EVENT_LIST";
const initialState = {
  data: null
};

export const FETCH_EVENT_LIST = `redux/${MODULE_NAME}/FETCH_EVENT_LIST`;
export const FETCH_EVENT_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_EVENT_LIST_SUCCESS`;
export const FETCH_EVENT_LIST_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function eventList(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_EVENT_LIST:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case FETCH_EVENT_LIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        status: "success"
      };

    case FETCH_EVENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        status: "fail"
      };

    case LOGOUT:
      return {
        ...state,
        status: "logout"
      };

    default:
      return state;
  }
}

function isLoading() {
  return {
    type: FETCH_EVENT_LIST
  }
}


export function fetchEventListSuccess(data) {
  return {
    type: FETCH_EVENT_LIST_SUCCESS,
    data: data
  }
}

export function fetchEventListFail(err) {
  return {
    type: FETCH_EVENT_LIST_FAIL,
    err: err
  }
}

export const fetchEventListAction = () => {

  return dispatch => {
    dispatch(isLoading());
    return client.get(`/events`).then(
      res => {
        const payload = res.data;
        dispatch(fetchEventListSuccess(payload))
      },
      err => {
        dispatch(fetchEventListFail(err));
        throw err
      }
    )
  }
};
