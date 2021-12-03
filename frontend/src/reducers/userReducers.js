import {
   CLEAR_ERRORS,
   NOTIFICATION_ORDER,
   NOTIFICATION_ORDER_FAIL,
   NOTIFICATION_ORDER_SUCCESS,
   REGISTER_USER_SUCCESS,
   USER_CREATE_ADDRESS_FAIL,
   USER_CREATE_ADDRESS_REQUEST,
   USER_CREATE_ADDRESS_SUCCESS,
   USER_DELETE_ADDRESS_FAIL,
   USER_DELETE_ADDRESS_REQUEST,
   USER_DELETE_ADDRESS_SUCCESS,
   USER_DELETE_FAIL,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_RESET,
   USER_DETAILS_SUCCESS,
   USER_EDIT_ADDRESS_FAIL,
   USER_EDIT_ADDRESS_REQUEST,
   USER_EDIT_ADDRESS_SUCCESS,
   USER_LIST_FAIL,
   USER_LIST_REQUEST,
   USER_LIST_RESET,
   USER_LIST_SUCCESS,
   CREATE_USER_FAIL,
   CREATE_USER_REQUEST,
   CREATE_USER_RESET,
   CREATE_USER_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   SHIPPER_LOGIN_FAIL,
   SHIPPER_LOGIN_REQUEST,
   SHIPPER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_SELECT_ROLE_FAIL,
   USER_SELECT_ROLE_REQUEST,
   USER_SELECT_ROLE_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_RESET,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_REQUEST,
   USER_UPDATE_RESET,
   USER_UPDATE_SUCCESS,
   NOTIFICATION_API_ORDER,
   NOTIFICATION_API_ORDER_FAIL,
   NOTIFICATION_API_ORDER_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
      case SHIPPER_LOGIN_REQUEST:
         return { loading: true }
      case USER_LOGIN_SUCCESS:
      case SHIPPER_LOGIN_SUCCESS:
         return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
      case SHIPPER_LOGIN_FAIL:
         return { loading: false, error: action.payload }
      case USER_LOGOUT:
         return {}
      default:
         return state
   }
}

export const userRegisterReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true }
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return { ...state, loading: true }
      case USER_DETAILS_SUCCESS:
         console.log('usreRe2', action.payload)
         return { loading: false, success: true, user: action.payload }
      case USER_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      case USER_DETAILS_RESET:
         return { ...state }
      default:
         return state
   }
}

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
         return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true, user: action.payload }
      case USER_UPDATE_PROFILE_FAIL:
         return { loading: false, error: action.payload }
      case USER_UPDATE_PROFILE_RESET:
         return { user: {} }
      default:
         return state
   }
}

export const userListReducer = (state = { users: [] }, action) => {
   switch (action.type) {
      case USER_LIST_REQUEST:
         return { loading: true }
      case USER_LIST_SUCCESS:
         return { loading: false, users: action.payload }
      case USER_LIST_FAIL:
         return { loading: false, error: action.payload }
      case USER_LIST_RESET:
         return { users: [] }
      default:
         return state
   }
}

export const userDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_DELETE_REQUEST:
         return { loading: true }
      case USER_DELETE_SUCCESS:
         return { loading: false, success: true }
      case USER_DELETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userDeleteAddressReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_DELETE_ADDRESS_REQUEST:
         return { loading: true }
      case USER_DELETE_ADDRESS_SUCCESS:
         return { loading: false, success: true }
      case USER_DELETE_ADDRESS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userCreateAddressReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_CREATE_ADDRESS_REQUEST:
         return { loading: true }
      case USER_CREATE_ADDRESS_SUCCESS:
         return { loading: false, success: true, user: action.payload }
      case USER_CREATE_ADDRESS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userUpdateAddressReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_EDIT_ADDRESS_REQUEST:
         return { loading: true }
      case USER_EDIT_ADDRESS_SUCCESS:
         return { loading: false, success: true, user: action.payload }
      case USER_EDIT_ADDRESS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userSelectRoleReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_SELECT_ROLE_REQUEST:
         return { loading: true }
      case USER_SELECT_ROLE_SUCCESS:
         return { loading: false, success: true, user: action.payload }
      case USER_SELECT_ROLE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const userUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return { loading: true }
      case USER_UPDATE_SUCCESS:
         return { loading: false, success: true, s: action.payload }
      case USER_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
         return { users: [] }
      default:
         return state
   }
}

export const createUserReducer = (state = {}, action) => {
   switch (action.type) {
      case CREATE_USER_REQUEST:
         return { loading: true }
      case CREATE_USER_SUCCESS:
         return { loading: false, success: action.payload }
      case CREATE_USER_FAIL:
         return { loading: false, error: action.payload }
      case CREATE_USER_RESET:
         return { ...state, success: false}
      default:
         return state
   }
}

export const authReducer = (state = { user: {} }, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
      case USER_REGISTER_REQUEST:
      case USER_DETAILS_REQUEST:
         return {
            loading: true,
            isAuthenticated: false,
         }

      case USER_LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case USER_DETAILS_SUCCESS:
         console.log('userRe', action.payload)
         return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
         }

      case USER_LOGOUT:
         return {
            loading: false,
            isAuthenticated: false,
            user: null,
         }

      case USER_DETAILS_FAIL:
         return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
         }

      // case LOGOUT_FAIL:
      //   return {
      //     ...state,
      //     error: action.payload,
      //   }

      case USER_LOGIN_FAIL:
      case USER_REGISTER_FAIL:
         return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
         }

      case CLEAR_ERRORS:
         return {
            ...state,
            error: null,
         }

      default:
         return state
   }
}

const initialState = {
   token: null,
   userData: {},
   notificationsCount: 0,
}

export const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case NOTIFICATION_ORDER:
         return {
            ...state,
            notificationsCount: action.payload.count,
            userData: action.payload,
         }
      case NOTIFICATION_ORDER_SUCCESS:
         return { ...state }
      case NOTIFICATION_ORDER_FAIL:
         return { loading: false, error: action.payload }

      default:
         return state
   }
}

export const userNotificationReducer = (state = { notifi: {} }, action) => {
   switch (action.type) {
      case NOTIFICATION_API_ORDER:
         return { loading: true }
      case NOTIFICATION_API_ORDER_SUCCESS:
         return { loading: false, notifi: action.payload }
      case NOTIFICATION_API_ORDER_FAIL:
         return { loading: false, error: action.payload }

      default:
         return state
   }
}
