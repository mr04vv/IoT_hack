import client from "../../utilities/apiClient";

const MODULE_NAME = "FETCH_ACTION_LIST";
const initialState = {
  data: null
};

export const FETCH_ACTION_LIST = `redux/${MODULE_NAME}/FETCH_ACTION_LIST`;
export const FETCH_ACTION_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_ACTION_LIST_SUCCESS`;
export const FETCH_ACTION_LIST_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function actionList(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ACTION_LIST:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case FETCH_ACTION_LIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        status: "success"
      };

    case FETCH_ACTION_LIST_FAIL:
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
    type: FETCH_ACTION_LIST
  }
}


export function fetchActionListSuccess(data) {
  return {
    type: FETCH_ACTION_LIST_SUCCESS,
    data: data
  }
}

export function fetchActionListFail(err) {
  return {
    type: FETCH_ACTION_LIST_FAIL,
    err: err
  }
}

export const fetchActionListAction = () => {

  return dispatch => {
    dispatch(isLoading());
    return client.get(`/relations`).then(
      res => {
        const payload = res.data;
        dispatch(fetchActionListSuccess(payload))
      },
      err => {
        dispatch(fetchActionListFail(err));
        throw err
      }
    )
  }
};
