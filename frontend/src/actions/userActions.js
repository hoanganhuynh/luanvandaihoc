import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import {
   CLEAR_ERRORS,
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
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
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
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST,
      });

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const { data } = await axios.post(
         '/api/users/login',
         { email, password },
         config
      );

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const register = (name, email, avatar, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST,
      });

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const { data } = await axios.post(
         '/api/users',
         { name, email, avatar, password },
         config
      );

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      });

      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_REGISTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DETAILS_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: USER_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_PROFILE_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.put('/api/users/profile', user, config);

      dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
         type: USER_LOGOUT,
         type: USER_DETAILS_RESET,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: USER_UPDATE_PROFILE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const logout = () => (dispatch) => {
   localStorage.removeItem('userInfo');
   dispatch({ type: USER_LOGOUT });
   dispatch({ type: USER_DETAILS_RESET });
   dispatch({ type: ORDER_LIST_MY_RESET });
   dispatch({ type: USER_LIST_RESET });
};

export const listUsers = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_LIST_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get('/api/users', config);

      dispatch({
         type: USER_LIST_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: USER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deleteUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DELETE_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.delete(`/api/users/${id}`, config);

      dispatch({
         type: USER_DELETE_SUCCESS,
      });
   } catch (error) {
      dispatch({
         type: USER_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const updateUser = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({ type: USER_UPDATE_SUCCESS });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: USER_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deleteAddressUser = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DELETE_ADDRESS_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      console.log('id address', id);

      await axios.post('/api/users/deleteaddress', id, config);

      dispatch({
         type: USER_DELETE_ADDRESS_SUCCESS,
      });
   } catch (error) {
      dispatch({
         type: USER_DELETE_ADDRESS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const createAddressUser = (address) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_CREATE_ADDRESS_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.post('/api/users/createaddress', address, config);

      dispatch({
         type: USER_CREATE_ADDRESS_SUCCESS,
      });
   } catch (error) {
      dispatch({
         type: USER_CREATE_ADDRESS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const updateAddressUser = (address) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_EDIT_ADDRESS_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.post('/api/users/address', address, config);

      dispatch({
         type: USER_EDIT_ADDRESS_SUCCESS,
      });
   } catch (error) {
      dispatch({
         type: USER_EDIT_ADDRESS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const selectRoleAddressUser =
   (address) => async (dispatch, getState) => {
      try {
         dispatch({
            type: USER_SELECT_ROLE_REQUEST,
         });

         const {
            userLogin: { userInfo },
         } = getState();

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         };

         await axios.post('/api/users/roleaddress', address, config);

         dispatch({
            type: USER_SELECT_ROLE_SUCCESS,
         });
      } catch (error) {
         dispatch({
            type: USER_SELECT_ROLE_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         });
      }
   };

export const clearErrors = () => async (dispatch) => {
   dispatch({
      type: CLEAR_ERRORS,
   });
};
