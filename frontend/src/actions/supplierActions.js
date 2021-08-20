import axios from 'axios'
import {
  SUPPLIER_CREATE_FAIL,
  SUPPLIER_CREATE_REQUEST,
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
  SUPPLIER_UPDATE_SUCCESS,
} from '../constants/supplierConstants'

export const listSupplierAdm = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_LIST_REQUEST,
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

    const { data } = await axios.get('/api/supplier/adm', config)

    dispatch({
      type: SUPPLIER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUPPLIER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSupplier = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_LIST_REQUEST,
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

    const { data } = await axios.get('/api/supplier', config)

    dispatch({
      type: SUPPLIER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUPPLIER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getSupplierDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/supplier/${id}`, config)

    dispatch({
      type: SUPPLIER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUPPLIER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateSupplier = (sup) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/supplier/${sup._id}`, sup, config)

    dispatch({
      type: SUPPLIER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUPPLIER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSupplier = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_CREATE_REQUEST,
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

    const { data } = await axios.post('/api/supplier', { name }, config)

    dispatch({
      type: SUPPLIER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUPPLIER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteSupplier = ({ id }) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPPLIER_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    console.log('delete suplier', id)

    await axios.delete(`/api/supplier/${[id]}`, config)

    dispatch({
      type: SUPPLIER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: SUPPLIER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
