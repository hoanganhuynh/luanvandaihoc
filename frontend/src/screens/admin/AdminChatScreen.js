// import { FormControl, IconButton, Input } from '@material-ui/core'
// import SendIcon from '@material-ui/icons/Send'
// import firebase from 'firebase'
// import React, { useEffect, useState } from 'react'
// import FlipMove from 'react-flip-move'
// import { useDispatch, useSelector } from 'react-redux'
// import { listUsers } from '../../actions/userActions'
// import db from '../../firebase'
// import MessageChat from './components/AdminMessageChat'

// const AdminChatScreen = () => {
//    const [input, setInput] = useState('')
//    const [messages, setMessages] = useState([])
//    const [username, setUsername] = useState('')

//    const dispatch = useDispatch()

//    const userLogin = useSelector((state) => state.userLogin)
//    const { userInfo } = userLogin

//    const userList = useSelector((state) => state.userList)
//    const { loading, error, users } = userList

//    const user = userInfo && userInfo.email

//    function buildDockey(user) {
//       return ['admin@example.com', 'DTK@example.com'].sort().join(':')
//    }

//    const docKey = buildDockey(user)

//    useEffect(() => {
//       db.collection('chats')
//          .doc(docKey)
//          .onSnapshot((snapshot) => {
//             setMessages(snapshot.data()?.messages)
//          })
//    }, [])

//    useEffect(() => {
//       dispatch(listUsers())
//       setUsername(user)
//    }, [])

//    const sendMessage = (e) => {
//       e.preventDefault()

//       db.collection('chats')
//          .doc(docKey)
//          .update({
//             messages: firebase.firestore.FieldValue.arrayUnion({
//                message: input,
//                sender: user,
//                timestamp: Date.now(),
//             }),
//             is_read: false,
//             users: ['admin@example.com', 'DTK@example.com'],
//          })

//       // db.collection('chats')
//       //    .doc(docKey)
//       //    .set({
//       //       messages: firebase.firestore.FieldValue.arrayUnion({
//       //          message: input,
//       //          sender: user,
//       //          timestamp: Date.now(),
//       //       }),
//       //       is_read: false,
//       //       users: ['admin@example.com', user],
//       //    })
//       setInput('')
//    }

//    return (
//       <div className='text-center'>
//          <h1>Chat</h1>
//          <h2>Welcome {username}</h2>
//          <form className='app__form'>
//             <FormControl className='app__formControl'>
//                <Input
//                   className='app__input'
//                   placeholder='Bạn có điều muốn nói '
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                />
//                <IconButton
//                   className='app__iconButton'
//                   disabled={!input}
//                   variant='contained'
//                   color='primary'
//                   type='submit'
//                   onClick={sendMessage}
//                >
//                   <SendIcon />
//                </IconButton>
//             </FormControl>
//          </form>

//          <FlipMove>
//             {messages?.map(({ id, message, sender }) => (
//                <MessageChat
//                   key={id}
//                   username={user}
//                   message={message}
//                   sender={sender}
//                />
//             ))}
//          </FlipMove>
//       </div>
//    )
// }

// export default AdminChatScreen
