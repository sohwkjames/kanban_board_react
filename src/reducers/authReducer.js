export function authReducer(state, action) {
  switch (action.type) {
    case "login":
      console.log("Firing log in, before state is", state, action);
      return {
        ...state,
        username: action.payload.username,
        userGroups: action.payload.userGroups,
        isAdmin: action.payload.isAdmin,
        isActive: action.payload.isActive,
      };

    case "setAdmin":
      console.log("Firing set admin, before state is", state, action);

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
      console.log("Firing set user, before state is", state, action);

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
