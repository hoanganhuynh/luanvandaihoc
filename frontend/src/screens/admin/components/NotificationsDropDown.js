import React, { useEffect } from 'react'
import { List, Avatar, Skeleton } from 'antd'
import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

export default function NotificationsDropDown(props) {
   useEffect(() => {
      const clickAwayEvent = () => {
         props.setVisibleNoti(false)
      }

      props.desktopSize && window.addEventListener('click', clickAwayEvent)

      return () => {
         window.removeEventListener('click', clickAwayEvent)
      }
   }, [props])

   return (
      <List
         className={props.className}
         dataSource={props.notifications}
         renderItem={(notify, index) => {
            let title
            let url = '/'

            switch (notify.logId.type) {
               case 'create order':
                  title = `${notify.logId.userId.name} đã đặt hàng.`
                  url = `/order-detail/${notify.logId.rootId}`
                  break
               default:
                  break
            }
            return (
               <List.Item
                  className={notify.hasRead ? '' : 'unread'}
                  extra={
                     notify.hasRead ? '' : <div className='unread-dot'></div>
                  }
                  onClick={() => props.markAsReadHandler(index, url)}
               >
                  <List.Item.Meta
                     avatar={
                        <Avatar
                           src={notify.logId.userId.avatar.url}
                           size='large'
                        />
                     }
                     title={title}
                     description={moment(notify.logId.createdAt).fromNow()}
                  />
               </List.Item>
            )
         }}
         footer={props.footer}
         header={props.header}
      >
         {props.loading &&
            [1, 2, 3, 4].map((ske) => (
               <List.Item key={ske}>
                  <Skeleton
                     avatar
                     title={{ width: '100%' }}
                     paragraph={{ rows: 1, width: '30%' }}
                     loading
                     active
                  />
               </List.Item>
            ))}
      </List>
   )
}
