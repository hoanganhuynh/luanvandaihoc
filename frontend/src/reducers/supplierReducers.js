import {
  SUPPLIER_CREATE_FAIL,
  SUPPLIER_CREATE_REQUEST,
  SUPPLIER_CREATE_RESET,
  SUPPLIER_CREATE_SUCCESS,
  SUPPLIER_DELETE_FAIL,
  SUPPLIER_DELETE_REQUEST,
  SUPPLIER_DELETE_SUCCESS,
  SUPPLIER_DETAILS_FAIL,
  SUPPLIER_DETAILS_REQUEST,
  SUPPLIER_DETAILS_SUCCESS,
  SUPPLIER_LIST_FAIL,
  SUPPLIER_LIST_REQUEST,
  SUPPLIER_LIST_SUCCESS,
  SUPPLIER_UPDATE_FAIL,
  SUPPLIER_UPDATE_REQUEST,
  SUPPLIER_UPDATE_RESET,
  SUPPLIER_UPDATE_SUCCESS,
} from '../constants/supplierConstants'

export const supplierListReducerAdm = (state = { supplier: [] }, action) => {
  switch (action.type) {
    case SUPPLIER_LIST_REQUEST:
      return { loading: true }
    case SUPPLIER_LIST_SUCCESS:
      return {
        loading: false,
        supplier: action.payload,
      }
    case SUPPLIER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const supplierListReducer = (state = { supplier: [] }, action) => {
  switch (action.type) {
    case SUPPLIER_LIST_REQUEST:
      return { loading: true }
    case SUPPLIER_LIST_SUCCESS:
      return {
        loading: false,
        supplier: action.payload,
      }
    case SUPPLIER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const supplierDetailsReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case SUPPLIER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SUPPLIER_DETAILS_SUCCESS:
      return { loading: false, supplier: action.payload }
    case SUPPLIER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const supplierUpdateReducer = (state = { supplier: {} }, action) => {
  switch (action.type) {
    case SUPPLIER_UPDATE_REQUEST:
      return { loading: true }
    case SUPPLIER_UPDATE_SUCCESS:
      return { loading: false, success: true, supplier: action.payload }
    case SUPPLIER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SUPPLIER_UPDATE_RESET:
      return { supplier: {} }
    default:
      return state
  }
}

export const supplierCreateReducer = (state = { supplier: [] }, action) => {
  switch (action.type) {
    case SUPPLIER_CREATE_REQUEST:
      return { loading: true }
    case SUPPLIER_CREATE_SUCCESS:
      return { loading: false, success: true, supplier: action.payload }
    case SUPPLIER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SUPPLIER_CREATE_RESET:
      return { supplier: [] }
    default:
      return state
  }
}

export const supplierDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPLIER_DELETE_REQUEST:
      return { loading: true }
    case SUPPLIER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SUPPLIER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
