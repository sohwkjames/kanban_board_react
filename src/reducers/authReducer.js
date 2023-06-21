export function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        userGroup: action.payload.userGroup,
        isLoggedIn: true,
      };
    case "logout":
      return {
        userGroup: "",
        isLoggedIn: false,
      };
    default:
      return {};
  }
}

export const initialReducerState = {
  username: "",
  isLoggedIn: false,
  userGroup: "",
};
