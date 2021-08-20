import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React, { forwardRef } from 'react'
import '../../src/styles/chat.css'

const MessageChat = forwardRef(({ username, message, sender }, ref) => {
   const isUser = username === sender

   return (
      <div ref={ref} className={`message ${isUser && 'message__user'}`}>
         <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
            <CardContent>
               <Typography color='white' variant='h5' component='h2'>
                  {!isUser && `${sender}:`} {message}
               </Typography>
            </CardContent>
         </Card>
      </div>
   )
})

export default MessageChat
