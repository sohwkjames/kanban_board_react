export function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.payload.username,
        userGroup: action.payload.userGroup,
      };
    case "logout":
      return {
        username: "",
        userGroup: "",
        isActive: 0,
        email: "",
      };
    case "setUser":
      return {
        username: action.payload.username,
        userGroup: action.payload.userGroup,
        isActive: action.payload.isActive,
        email: action.payload.email,
      };
    default:
      return {};
  }
}

export const initialReducerState = {
  username: "",
  userGroup: "",
};
