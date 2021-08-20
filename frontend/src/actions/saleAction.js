import axios from 'axios'
import {
   SALE_CREATE_FAIL,
   SALE_CREATE_REQUEST,
   SALE_CREATE_SUCCESS,
   SALE_DELETE_FAIL,
   SALE_DELETE_REQUEST,
   SALE_DELETE_SUCCESS,
   SALE_DETAIL_FAIL,
   SALE_DETAIL_REQUEST,
   SALE_DETAIL_SUCCESS,
   SALE_LIST_FAIL,
   SALE_LIST_REQUEST,
   SALE_LIST_SUCCESS,
   SALE_UPDATE_FAIL,
   SALE_UPDATE_REQUEST,
   SALE_UPDATE_SUCCESS,
} from '../constants/saleConstants'

export const listSale = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SALE_LIST_REQUEST,
      })

      // const {
      //    userLogin: { userInfo },
      // } = getState()

      // const config = {
      //    headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${userInfo.token}`,
      //    },
      // }

      const { data } = await axios.get('/api/sale')

      dispatch({
         type: SALE_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SALE_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getSaleDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SALE_DETAIL_REQUEST,
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

      const { data } = await axios.get(`/api/SALE/${id}`, config)

      dispatch({
         type: SALE_DETAIL_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SALE_DETAIL_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateSale = (cat) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SALE_UPDATE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/sale/${cat._id}`, cat, config)

      dispatch({
         type: SALE_UPDATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SALE_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const createSale = (name) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SALE_CREATE_REQUEST,
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

      const { data } = await axios.post('/api/sale', { name }, config)

      dispatch({
         type: SALE_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SALE_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteSale = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: SALE_DELETE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/sale/${id}`, config)

      dispatch({
         type: SALE_DELETE_SUCCESS,
      })
   } catch (error) {
      dispatch({
         type: SALE_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
