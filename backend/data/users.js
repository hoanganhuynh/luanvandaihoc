import bcryptjs from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/images/alexa.jpg',
    password: bcryptjs.hashSync('123456', 10),
    isAdmin: true,
    sex: 'nam',
    birthDay: '2021-03-22T14:11:54.000Z',
    address: {
      thanhPho: 'Thành phố Cần Thơ',
      huyen: 'Quận Ninh Kiều',
      xa: 'Phường An Khánh',
      diaChi: '22',
    },
    numberPhone: '0123456789',
  },

  {
    name: 'Hoang Anh',
    email: 'HA@example.com',
    avatar: '/images/alexa.jpg',
    password: bcryptjs.hashSync('123456', 10),
    sex: 'nam',
    birthDay: '2021-03-22T14:11:54.000Z',
    address: {
      thanhPho: 'Thành phố Cần Thơ',
      huyen: 'Quận Ninh Kiều',
      xa: 'Phường An Khánh',
      diaChi: '22',
    },
  },

  {
    name: 'Trung Kien',
    email: 'TK@example.com',
    avatar: '/images/alexa.jpg',
    password: bcryptjs.hashSync('123456', 10),
    sex: 'nam',
    birthDay: '2021-03-22T14:11:54.000Z',
    address: {
      thanhPho: 'Thành phố Cần Thơ',
      huyen: 'Quận Ninh Kiều',
      xa: 'Phường An Khánh',
      diaChi: '22',
    },
  },
]

export default users
