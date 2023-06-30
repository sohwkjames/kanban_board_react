export function authReducer(state, action) {
  switch (action.type) {
    case "login":
      console.log("login action firing");
      return {
        ...state,
        username: action.payload.username,
        userGroups: action.payload.userGroups,
        isAdmin: action.payload.isAdmin,
      };

    case "setAdmin":
      console.log("setadmin action firing, payload is ", action.payload);
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
      };

    case "logout":
      return {
        ...state,
        username: "",
        userGroups: [],
        isActive: 0,
        email: "",
        isAdmin: false,
      };
    case "setUser":
      return {
        ...state,
        username: action.payload.username,
        userGroups: action.payload.userGroups,
        isActive: action.payload.isActive,
        email: action.payload.email,
      };
    default:
      return {};
  }
}

export const initialReducerState = {
  username: "",
  userGroups: [],
  isAdmin: false,
};
