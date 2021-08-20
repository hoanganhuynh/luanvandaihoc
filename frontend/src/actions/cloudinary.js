import axios from 'axios'

export const uploadFileImages = (data) => {
   return axios.post('/api/uploadImages', data)
}

export const uploadFileAvatar = (data) => {
   return axios.post('/api/uploadImages/avatar', data)
}

export const deleteFileImages = (data) => {
   return axios.post('/api/uploadImages', data)
}
