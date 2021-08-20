import axios from 'axios'
import {
   SUB_CATEGORY_CREATE_FAIL,
   SUB_CATEGORY_CREATE_REQUEST,
   SUB_CATEGORY_CREATE_SUCCESS,
   SUB_CATEGORY_DELETE_FAIL,
   SUB_CATEGORY_DELETE_REQUEST,
   SUB_CATEGORY_DELETE_SUCCESS,
   SUB_CATEGORY_DETAILS_FAIL,
   SUB_CATEGORY_DETAILS_REQUEST,
   SUB_CATEGORY_DETAILS_SUCCESS,
   SUB_CATEGORY_LIST_FAIL,
   SUB_CATEGORY_LIST_REQUEST,
   SUB_CATEGORY_LIST_SUCCESS,
   SUB_CATEGORY_UPDATE_FAIL,
   SUB_CATEGORY_UPDATE_REQUEST,
   SUB_CATEGORY_UPDATE_SUCCESS,
} from '../constants/subCategoryConstants'

export const listSubCategoryAdm = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUB_CATEGORY_LIST_REQUEST,
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

      const { data } = await axios.get('/api/subCategory/adm', config)

      dispatch({
         type: SUB_CATEGORY_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SUB_CATEGORY_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const listSubCategory = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUB_CATEGORY_LIST_REQUEST,
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

      const { data } = await axios.get('/api/subCategory', config)

      dispatch({
         type: SUB_CATEGORY_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SUB_CATEGORY_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getSubCategoryDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUB_CATEGORY_DETAILS_REQUEST,
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

      const { data } = await axios.get(`/api/subCategory/${id}`, config)

      dispatch({
         type: SUB_CATEGORY_DETAILS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SUB_CATEGORY_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateSubCategory = (cat) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUB_CATEGORY_UPDATE_REQUEST,
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
         `/api/subCategory/${cat._id}`,
         cat,
         config
      )

      dispatch({
         type: SUB_CATEGORY_UPDATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SUB_CATEGORY_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const create_subCategory = (sub) => async (dispatch, getState) => {
   try {
      dispatch({
         type: SUB_CATEGORY_CREATE_REQUEST,
      })

      console.log('sub create', sub)

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post('/api/subCategory', sub, config)

      dispatch({
         type: SUB_CATEGORY_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: SUB_CATEGORY_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteSubCategory =
   ({ id }) =>
   async (dispatch, getState) => {
      try {
         dispatch({ type: SUB_CATEGORY_DELETE_REQUEST })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         }

         await axios.delete(`/api/subCategory/${[id]}`, config)

         dispatch({
            type: SUB_CATEGORY_DELETE_SUCCESS,
         })
      } catch (error) {
         dispatch({
            type: SUB_CATEGORY_DELETE_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }
