import axios from 'axios'
import {
   ORDER_CASH_FAIL,
   ORDER_CASH_REQUEST,
   ORDER_CASH_SUCCESS,
   ORDER_CONSULT_FAIL,
   ORDER_CONSULT_REQUEST,
   ORDER_CONSULT_SUCCESS,
   ORDER_CREATE_FAIL,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_DELETE_FAIL,
   ORDER_DELETE_REQUEST,
   ORDER_DELETE_SUCCESS,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_FILTER_FAIL,
   ORDER_FILTER_REQUEST,
   ORDER_FILTER_SUCCESS,
   ORDER_LIST_FAIL,
   ORDER_LIST_MY_FAIL,
   ORDER_LIST_MY_REQUEST,
   ORDER_LIST_MY_SUCCESS,
   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_PAY_FAIL,
   ORDER_PAY_REQUEST,
   ORDER_PAY_SUCCESS,
   ORDER_UPDATE_BY_MEMBER_FAIL,
   ORDER_UPDATE_BY_MEMBER_REQUEST,
   ORDER_UPDATE_BY_MEMBER_SUCCESS,
   ORDER_UPDATE_FAIL,
   ORDER_UPDATE_REQUEST,
   ORDER_UPDATE_SUCCESS,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_CREATE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post('/api/orders', order, config)

      dispatch({
         type: ORDER_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DETAILS_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/orders/${id}`, config)

      dispatch({
         type: ORDER_DETAILS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const payOrder =
   (orderId, paymentResult) => async (dispatch, getState) => {
      try {
         dispatch({
            type: ORDER_PAY_REQUEST,
         })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
            },
         }

         const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
         )

         dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
         })
      } catch (error) {
         dispatch({
            type: ORDER_PAY_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const Cash = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_CASH_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `/api/orders/${order._id}/CASH`,
         {},
         config
      )

      dispatch({
         type: ORDER_CASH_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_CASH_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DELIVER_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      console.log('delivered', order)

      const { data } = await axios.put(
         `/api/orders/${order._id}/deliver`,
         {},
         config
      )

      dispatch({
         type: ORDER_DELIVER_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_DELIVER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const listMyOrders = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_LIST_MY_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/orders/myorders`, config)

      dispatch({
         type: ORDER_LIST_MY_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_LIST_MY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const listOrders = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_LIST_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get(`/api/orders`, config)

      dispatch({
         type: ORDER_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteOrder = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_DELETE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/orders/${id}`, config)

      dispatch({
         type: ORDER_DELETE_SUCCESS,
      })
   } catch (error) {
      dispatch({
         type: ORDER_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_UPDATE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `/api/orders/${order._id}`,
         order,
         config
      )

      dispatch({
         type: ORDER_UPDATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateOrderByMember = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_UPDATE_BY_MEMBER_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(
         `/api/orders/${order._id}`,
         order,
         config
      )

      dispatch({
         type: ORDER_UPDATE_BY_MEMBER_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_UPDATE_BY_MEMBER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const consultOrder = (consult) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_CONSULT_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(`/api/orders/consult`, consult, config)

      dispatch({
         type: ORDER_CONSULT_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_CONSULT_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const filterOrder = (orderStatus) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ORDER_FILTER_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         `/api/orders/filter`,
         orderStatus,
         config
      )

      dispatch({
         type: ORDER_FILTER_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: ORDER_FILTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
