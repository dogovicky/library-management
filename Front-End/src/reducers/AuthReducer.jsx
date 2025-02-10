export const initialState = {
  authenticated: false,
  user: null,
  token: null,
  //   role: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        // role: action.payload.user.roles.role_name,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        authenticated: false,
        user: null,
        token: null,
        // role: null,
      };
    }
    default: {
      return state;
    }
  }
};
