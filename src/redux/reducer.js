import { combineReducers } from "redux";

import * as events from "./events"

export default combineReducers({
  ...events
});
