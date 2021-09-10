import axios from 'axios';
import {
   APPROVE_STATUS_FAIL,
   APPROVE_STATUS_REQUEST,
   APPROVE_STATUS_SUCCESS,
   DELETE_STATUS_FAIL,
   DELETE_STATUS_REQUEST,
   DELETE_STATUS_SUCCESS,
   FILTER_REVIEW_FAIL,
   FILTER_REVIEW_REQUEST,
   FILTER_REVIEW_SUCCESS,
   LIST_REVIEWS_FAIL,
   LIST_REVIEWS_REQUEST,
   LIST_REVIEWS_SUCCESS,
} from '../constants/reviewsConstants';

export const listAllReviews = () => async (dispatch) => {
   try {
      dispatch({
         type: LIST_REVIEWS_REQUEST,
      });

      const { data } = await axios.get('/api/reviews');

      dispatch({
         type: LIST_REVIEWS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: LIST_REVIEWS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const approveStatusOfReviews =
   (review) => async (dispatch, getState) => {
      try {
         dispatch({
            type: APPROVE_STATUS_REQUEST,
         });

         const {
            userLogin: { userInfo },
         } = getState();

         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
         };

         const { data } = await axios.post(
            '/api/reviews/approveStatusOfReviews',
            review,
            config
         );

         dispatch({
            type: APPROVE_STATUS_SUCCESS,
            payload: data,
         });
      } catch (error) {
         dispatch({
            type: APPROVE_STATUS_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         });
      }
   };

export const deleteStatusOfReviews = (review) => async (dispatch, getState) => {
   try {
      dispatch({
         type: DELETE_STATUS_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.post(
         '/api/reviews/deleteStatusOfReviews',
         review,
         config
      );

      dispatch({
         type: DELETE_STATUS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: DELETE_STATUS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const filterReviews = (status) => async (dispatch, getState) => {
   try {
      dispatch({
         type: FILTER_REVIEW_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.post(
         '/api/reviews/filterReviews',
         status,
         config
      );

      dispatch({
         type: FILTER_REVIEW_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: FILTER_REVIEW_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
