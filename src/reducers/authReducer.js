export function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.payload.username,
        userGroups: action.payload.userGroups,
        isAdmin: action.payload.isAdmin,
        isActive: action.payload.isActive,
      };

    case "setAdmin":
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
      };

    case "logout":
      return {
        ...state,
        username: "",
        userGroups: [],
        isActive: false,
        email: "",
        isAdmin: false,
      };
    case "setUser":
      return {
        ...state,
        username: action.payload.username,
        userGroups: action.payload.userGroups,
        isActive: action.payload.isActive,
        isAdmin: action.payload.isAdmin,
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
  isActive: false,
};
