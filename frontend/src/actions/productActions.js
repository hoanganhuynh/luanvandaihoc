import axios from 'axios'
import {
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_REVIEW_FAIL,
   PRODUCT_CREATE_REVIEW_REQUEST,
   PRODUCT_CREATE_REVIEW_SUCCESS,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_FILTER_FAIL,
   PRODUCT_FILTER_PRICE_FAIL,
   PRODUCT_FILTER_PRICE_REQUEST,
   PRODUCT_FILTER_PRICE_SUCCESS,
   PRODUCT_FILTER_REQUEST,
   PRODUCT_FILTER_SUB_FAIL,
   PRODUCT_FILTER_SUB_REQUEST,
   PRODUCT_FILTER_SUB_SUCCESS,
   PRODUCT_FILTER_SUCCESS,
   PRODUCT_LIST_ALL_FAIL,
   PRODUCT_LIST_ALL_REQUEST,
   PRODUCT_LIST_ALL_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_OF_CATEGORY_FAIL,
   PRODUCT_OF_CATEGORY_REQUEST,
   PRODUCT_OF_CATEGORY_SUCCESS,
   PRODUCT_OF_SUB_CATEGORY_FAIL,
   PRODUCT_OF_SUB_CATEGORY_REQUEST,
   PRODUCT_OF_SUB_CATEGORY_SUCCESS,
   PRODUCT_TOP_FAIL,
   PRODUCT_TOP_REQUEST,
   PRODUCT_TOP_SOLD_FAIL,
   PRODUCT_TOP_SOLD_REQUEST,
   PRODUCT_TOP_SOLD_SUCCESS,
   PRODUCT_TOP_SUCCESS,
   PRODUCT_UPDATE_FAIL,
   PRODUCT_UPDATE_REQUEST,
   PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'

export const listProducts =
   (keyword = '', pageNumber = '') =>
   async (dispatch) => {
      try {
         dispatch({ type: PRODUCT_LIST_REQUEST })

         const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
         )

         dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
         })
      } catch (error) {
         dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const listAllProduct = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: PRODUCT_LIST_ALL_REQUEST,
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

      const { data } = await axios.get('/api/products/adm', config)

      dispatch({
         type: PRODUCT_LIST_ALL_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_LIST_ALL_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const listProductDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST })

      const { data } = await axios.get(`/api/products/${id}`)

      dispatch({
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getProductOfCategory = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_OF_CATEGORY_REQUEST })

      const { data } = await axios.get(`/api/products/${id}/category`)

      dispatch({
         type: PRODUCT_OF_CATEGORY_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_OF_CATEGORY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
export const getProductOfSubCategory = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_OF_SUB_CATEGORY_REQUEST })

      const { data } = await axios.get(`/api/products/${id}/subcategory`)

      dispatch({
         type: PRODUCT_OF_SUB_CATEGORY_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_OF_SUB_CATEGORY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_DELETE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      await axios.delete(`/api/products/${id}`, config)

      dispatch({
         type: PRODUCT_DELETE_SUCCESS,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const createProduct = (productData) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_CREATE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(`/api/products/`, productData, config)

      dispatch({
         type: PRODUCT_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log('error.response', error.response)
      dispatch({
         type: PRODUCT_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateProduct = (product) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST })

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
         `/api/products/${product._id}`,
         product,
         config
      )

      dispatch({
         type: PRODUCT_UPDATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const createProductReview =
   (productId, review) => async (dispatch, getState) => {
      try {
         dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

         const {
            userLogin: { userInfo },
         } = getState()

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
            },
         }

         await axios.post(`/api/products/${productId}/reviews`, review, config)

         dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
         })
      } catch (error) {
         dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         })
      }
   }

export const listTopRateProducts = () => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_TOP_REQUEST })

      const { data } = await axios.get(`/api/products/top`)

      dispatch({
         type: PRODUCT_TOP_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_TOP_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const listTopSoldProducts = () => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_TOP_SOLD_REQUEST })

      const { data } = await axios.get(`/api/products/topsold`)

      dispatch({
         type: PRODUCT_TOP_SOLD_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_TOP_SOLD_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const filterProduct = (category) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_FILTER_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      // console.log('category post', category)

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         '/api/products/filter/category',
         { category },
         config
      )

      dispatch({
         type: PRODUCT_FILTER_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_FILTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const filterSubProduct = (sub) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_FILTER_SUB_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      // console.log('category post', category)

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         '/api/products/filter/subcategory',
         { sub },
         config
      )

      dispatch({
         type: PRODUCT_FILTER_SUB_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_FILTER_SUB_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const filterPriceProduct = (price) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_FILTER_PRICE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.post(
         '/api/products/filter/price',
         { price },
         config
      )

      dispatch({
         type: PRODUCT_FILTER_PRICE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_FILTER_PRICE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const newProduct = (productData) => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_CREATE_REQUEST })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      console.log('productData', productData)

      const { data } = await axios.post(`/api/products/`, productData, config)

      dispatch({
         type: PRODUCT_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log(error.response)
      dispatch({
         type: PRODUCT_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
