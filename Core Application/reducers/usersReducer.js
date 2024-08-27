import { UPDATE_USERS } from "../constants/ActionTypes";

const initialState = [
  {
    id: "Coppa Coffee",
    name: "Coppa Coffee"
  }
];

const usersReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return action.data;
    default:
      return state ? state : initialState;
  }
};

export default usersReducer;
