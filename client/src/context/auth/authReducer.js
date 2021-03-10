import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  CONTACT_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
case CONTACT_ERROR:
    return{
        ...state,
        error: action.payload
    }
    default:
      return state
  }
}
