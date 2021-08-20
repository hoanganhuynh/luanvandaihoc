import axios from 'axios'
import {
   CODE_CREATE_FAIL,
   CODE_CREATE_REQUEST,
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
   CODE_UPDATE_SUCCESS,
} from '../constants/codeConstants'

export const listCode = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: CODE_LIST_REQUEST,
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

      const { data } = await axios.get('/api/code', config)

      dispatch({
         type: CODE_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: CODE_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getCodeDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: CODE_DETAIL_REQUEST,
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

      const { data } = await axios.get(`/api/code/${id}`, config)

      dispatch({
         type: CODE_DETAIL_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: CODE_DETAIL_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateCode = (cat) => async (dispatch, getState) => {
   try {
      dispatch({
         type: CODE_UPDATE_REQUEST,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.put(`/api/code/${cat._id}`, cat, config)

      dispatch({
         type: CODE_UPDATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: CODE_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const createCode = (name) => async (dispatch, getState) => {
   try {
      dispatch({
         type: CODE_CREATE_REQUEST,
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

      const { data } = await axios.post('/api/code', name, config)

      dispatch({
         type: CODE_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: CODE_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteCode = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: CODE_DELETE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/code/${id}`, config)

      dispatch({
         type: CODE_DELETE_SUCCESS,
      })
   } catch (error) {
      dispatch({
         type: CODE_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
