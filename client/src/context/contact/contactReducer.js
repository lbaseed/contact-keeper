import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.map((contact) =>
                contact._id === action.payload._id ? action.payload : contact
              )
            : null,
        loading: false,
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),

        filtered:
          state.filtered !== null
            ? state.filtered.filter((contact) => contact.id !== action.payload)
            : null,
        loading: false,
      }
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        error: null,
        current: null,
        filtered: null,
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regx = new RegExp(`${action.payload}`, "gi")
          return contact.name.match(regx) || contact.email.match(regx)
        }),
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}
