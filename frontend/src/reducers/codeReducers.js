import {
   CODE_CREATE_FAIL,
   CODE_CREATE_REQUEST,
   CODE_CREATE_RESET,
   CODE_CREATE_SUCCESS,
   CODE_DELETE_FAIL,
   CODE_DELETE_REQUEST,
   CODE_DELETE_SUCCESS,
   CODE_DETAIL_FAIL,
   CODE_DETAIL_REQUEST,
   CODE_DETAIL_SUCCESS,
   CODE_LIST_FAIL,
   CODE_LIST_REQUEST,
   CODE_LIST_SUCCESS,
   CODE_UPDATE_FAIL,
   CODE_UPDATE_REQUEST,
   CODE_UPDATE_RESET,
   CODE_UPDATE_SUCCESS,
} from '../constants/codeConstants'

export const codeListReducer = (state = { code: [] }, action) => {
   switch (action.type) {
      case CODE_LIST_REQUEST:
         return { loading: true }
      case CODE_LIST_SUCCESS:
         return {
            loading: false,
            code: action.payload,
         }
      case CODE_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const codeDetailsReducer = (state = { code: {} }, action) => {
   switch (action.type) {
      case CODE_DETAIL_REQUEST:
         return { ...state, loading: true }
      case CODE_DETAIL_SUCCESS:
         return { loading: false, code: action.payload }
      case CODE_DETAIL_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const codeUpdateReducer = (state = { code: {} }, action) => {
   switch (action.type) {
      case CODE_UPDATE_REQUEST:
         return { loading: true }
      case CODE_UPDATE_SUCCESS:
         return { loading: false, success: true, code: action.payload }
      case CODE_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      case CODE_UPDATE_RESET:
         return { code: {} }
      default:
         return state
   }
}

export const codeCreateReducer = (state = { code: [] }, action) => {
   switch (action.type) {
      case CODE_CREATE_REQUEST:
         return { loading: true }
      case CODE_CREATE_SUCCESS:
         return { loading: false, success: true, code: action.payload }
      case CODE_CREATE_FAIL:
         return { loading: false, error: action.payload }
      case CODE_CREATE_RESET:
         return {}
      default:
         return state
   }
}

export const codeDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case CODE_DELETE_REQUEST:
         return { loading: true }
      case CODE_DELETE_SUCCESS:
         return { loading: false, success: true }
      case CODE_DELETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}
