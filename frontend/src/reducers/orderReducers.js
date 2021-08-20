import {
   ORDER_CASH_FAIL,
   ORDER_CASH_REQUEST,
   ORDER_CASH_RESET,
   ORDER_CASH_SUCCESS,
   ORDER_CONSULT_FAIL,
   ORDER_CONSULT_REQUEST,
   ORDER_CONSULT_SUCCESS,
   ORDER_CREATE_FAIL,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_RESET,
   ORDER_CREATE_SUCCESS,
   ORDER_DELETE_FAIL,
   ORDER_DELETE_REQUEST,
   ORDER_DELETE_SUCCESS,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_RESET,
   ORDER_DELIVER_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_DETAIL_RESET,
   ORDER_FILTER_FAIL,
   ORDER_FILTER_REQUEST,
   ORDER_FILTER_RESET,
   ORDER_FILTER_SUCCESS,
   ORDER_LIST_FAIL,
   ORDER_LIST_MY_FAIL,
   ORDER_LIST_MY_REQUEST,
   ORDER_LIST_MY_RESET,
   ORDER_LIST_MY_SUCCESS,
   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_PAY_FAIL,
   ORDER_PAY_REQUEST,
   ORDER_PAY_RESET,
   ORDER_PAY_SUCCESS,
   ORDER_UPDATE_BY_MEMBER_FAIL,
   ORDER_UPDATE_BY_MEMBER_REQUEST,
   ORDER_UPDATE_BY_MEMBER_RESET,
   ORDER_UPDATE_BY_MEMBER_SUCCESS,
   ORDER_UPDATE_FAIL,
   ORDER_UPDATE_REQUEST,
   ORDER_UPDATE_RESET,
   ORDER_UPDATE_SUCCESS,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_CREATE_REQUEST:
         return {
            loading: true,
         }
      case ORDER_CREATE_SUCCESS:
         return {
            loading: false,
            success: true,
            order: action.payload,
         }
      case ORDER_CREATE_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_CREATE_RESET:
         return { order: {} }

      default:
         return state
   }
}

export const orderDetailsReducer = (
   state = { loading: true, orderItems: [], shippingAddress: {} },
   action
) => {
   switch (action.type) {
      case ORDER_DETAILS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case ORDER_DETAILS_SUCCESS:
         return {
            loading: false,
            order: action.payload,
         }
      case ORDER_DETAILS_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_DETAIL_RESET:
         return { ...state }

      default:
         return state
   }
}

export const orderPayReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_PAY_REQUEST:
         return {
            loading: true,
         }
      case ORDER_PAY_SUCCESS:
         return {
            loading: false,
            success: true,
         }
      case ORDER_PAY_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_PAY_RESET:
         return {}

      default:
         return state
   }
}

export const orderCashReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_CASH_REQUEST:
         return {
            loading: true,
         }
      case ORDER_CASH_SUCCESS:
         return {
            loading: false,
            success: true,
         }
      case ORDER_CASH_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_CASH_RESET:
         return {}

      default:
         return state
   }
}

export const orderDeliverReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_DELIVER_REQUEST:
         return {
            loading: true,
         }
      case ORDER_DELIVER_SUCCESS:
         return {
            loading: false,
            success: true,
         }
      case ORDER_DELIVER_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_DELIVER_RESET:
         return {}

      default:
         return state
   }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case ORDER_LIST_MY_REQUEST:
         return {
            loading: true,
         }
      case ORDER_LIST_MY_SUCCESS:
         return {
            loading: false,
            orders: action.payload,
         }
      case ORDER_LIST_MY_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      case ORDER_LIST_MY_RESET:
         return { orders: [] }

      default:
         return state
   }
}

export const orderListReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case ORDER_LIST_REQUEST:
         return {
            loading: true,
         }
      case ORDER_LIST_SUCCESS:
         return {
            loading: false,
            ordersList: action.payload,
         }
      case ORDER_LIST_FAIL:
         return {
            loading: false,
            error: action.payload,
         }
      // case ORDER_LIST_RESET:
      //   return {orders: []}
      default:
         return state
   }
}

export const orderDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_DELETE_REQUEST:
         return { loading: true }
      case ORDER_DELETE_SUCCESS:
         return { loading: false, success: true }
      case ORDER_DELETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const orderUpdateReducer = (state = { order: [] }, action) => {
   switch (action.type) {
      case ORDER_UPDATE_REQUEST:
         return { loading: true }
      case ORDER_UPDATE_SUCCESS:
         return { loading: false, success: true, order: action.payload }
      case ORDER_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      case ORDER_UPDATE_RESET:
         return { order: [] }
      default:
         return state
   }
}

export const orderUpdateByMemberReducer = (state = { order: [] }, action) => {
   switch (action.type) {
      case ORDER_UPDATE_BY_MEMBER_REQUEST:
         return { loading: true }
      case ORDER_UPDATE_BY_MEMBER_SUCCESS:
         return { loading: false, success: true, order: action.payload }
      case ORDER_UPDATE_BY_MEMBER_FAIL:
         return { loading: false, error: action.payload }
      case ORDER_UPDATE_BY_MEMBER_RESET:
         return { order: [] }
      default:
         return state
   }
}

export const orderConsultReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_CONSULT_REQUEST:
         return {
            loading: true,
         }
      case ORDER_CONSULT_SUCCESS:
         return {
            loading: false,
            success: true,
            order: action.payload,
         }
      case ORDER_CONSULT_FAIL:
         return {
            loading: false,
            error: action.payload,
         }

      default:
         return state
   }
}

export const orderFilterReducer = (state = { filter: [] }, action) => {
   switch (action.type) {
      case ORDER_FILTER_REQUEST:
         return { loading: true }
      case ORDER_FILTER_SUCCESS:
         return { loading: false, success: true, filter: action.payload }
      case ORDER_FILTER_FAIL:
         return { loading: false, error: action.payload }
      case ORDER_FILTER_RESET:
         return { order: [] }
      default:
         return state
   }
}
