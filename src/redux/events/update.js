import client from "../../utilities/apiClient";

const MODULE_NAME = "UPDATE_EVENT_RELATION";
const initialState = {
  data: null
};

export const UPDATE_EVENT_RELATION = `redux/${MODULE_NAME}/UPDATE_EVENT_RELATION`;
export const UPDATE_EVENT_RELATION_SUCCESS = `redux/${MODULE_NAME}/UPDATE_EVENT_RELATION_SUCCESS`;
export const UPDATE_EVENT_RELATION_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function updateRelation(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_EVENT_RELATION:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case UPDATE_EVENT_RELATION_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        status: "success"
      };

    case UPDATE_EVENT_RELATION_FAIL:
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
    type: UPDATE_EVENT_RELATION
  }
}


export function updateEventRelationSuccess(data) {
  return {
    type: UPDATE_EVENT_RELATION_SUCCESS,
    data: data
  }
}

export function updateEventRelationFail(err) {
  return {
    type: UPDATE_EVENT_RELATION_FAIL,
    err: err
  }
}

export const updateEventRelation = (id, data) => {
  return dispatch => {
    dispatch(isLoading());
    return client.put(`/relations/${id}`, data).then(
      res => {
        const payload = res.data;
        dispatch(updateEventRelationSuccess(payload))
      },
      err => {
        dispatch(updateEventRelationFail(err));
      }
    )
  }
};

