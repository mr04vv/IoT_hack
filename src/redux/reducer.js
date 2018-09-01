import { combineReducers } from "redux";

import * as events from "./events"
import * as actions from "./actions"

export default combineReducers({
  ...events,
  ...actions
});
