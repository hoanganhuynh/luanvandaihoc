import {
   APPROVE_STATUS_FAIL,
   APPROVE_STATUS_REQUEST,
   APPROVE_STATUS_RESET,
   APPROVE_STATUS_SUCCESS,
   DELETE_STATUS_FAIL,
   DELETE_STATUS_REQUEST,
   DELETE_STATUS_RESET,
   DELETE_STATUS_SUCCESS,
   FILTER_REVIEW_FAIL,
   FILTER_REVIEW_REQUEST,
   FILTER_REVIEW_RESET,
   FILTER_REVIEW_SUCCESS,
   LIST_REVIEWS_FAIL,
   LIST_REVIEWS_REQUEST,
   LIST_REVIEWS_SUCCESS,
} from '../constants/reviewsConstants';

export const listReviewsReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case LIST_REVIEWS_REQUEST:
         return { loading: true };
      case LIST_REVIEWS_SUCCESS:
         return {
            loading: false,
            products: action.payload,
         };
      case LIST_REVIEWS_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const approveStatusReducer = (state = { review: {} }, action) => {
   switch (action.type) {
      case APPROVE_STATUS_REQUEST:
         return { loading: true };
      case APPROVE_STATUS_SUCCESS:
         return { loading: false, success: true, review: action.payload };
      case APPROVE_STATUS_FAIL:
         return { loading: false, error: action.payload };
      case APPROVE_STATUS_RESET:
         return { review: {} };
      default:
         return state;
   }
};

export const deleteStatusReducer = (state = { review: {} }, action) => {
   switch (action.type) {
      case DELETE_STATUS_REQUEST:
         return { loading: true };
      case DELETE_STATUS_SUCCESS:
         return { loading: false, success: true, review: action.payload };
      case DELETE_STATUS_FAIL:
         return { loading: false, error: action.payload };
      case DELETE_STATUS_RESET:
         return { review: {} };
      default:
         return state;
   }
};

export const filterReviewReducer = (state = { filter: [] }, action) => {
   switch (action.type) {
      case FILTER_REVIEW_REQUEST:
         return { loading: true };
      case FILTER_REVIEW_SUCCESS:
         return { loading: false, success: true, filter: action.payload };
      case FILTER_REVIEW_FAIL:
         return { loading: false, error: action.payload };
      case FILTER_REVIEW_RESET:
         return { filter: [] };
      default:
         return state;
   }
};
