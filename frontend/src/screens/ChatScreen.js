// import { FormControl, IconButton, Input } from '@material-ui/core'
// import SendIcon from '@material-ui/icons/Send'
// import firebase from 'firebase'
// import React, { useEffect, useState } from 'react'
// import FlipMove from 'react-flip-move'
// import { useSelector } from 'react-redux'
// import MessageChat from '../components/MessageChat'
// import db from '../firebase'

// const ChatScreen = () => {
//    const [input, setInput] = useState('')
//    const [messages, setMessages] = useState([])
//    const [username, setUsername] = useState('')

//    const userLogin = useSelector((state) => state.userLogin)
//    const { userInfo } = userLogin

//    const user = userInfo && userInfo.email

//    function buildDockey(user) {
//       return ['admin@example.com', user].sort().join(':')
//    }

//    console.log('userInfo', messages)
//    const docKey = buildDockey(user)

//    useEffect(() => {
//       db.collection('chats')
//          .doc(docKey)
//          .onSnapshot((snapshot) => {
//             setMessages(snapshot.data()?.messages)
//          })
//    }, [])

//    useEffect(() => {
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
//             users: ['admin@example.com', user],
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

// export default ChatScreen
