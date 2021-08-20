import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
   return (
      pages > 1 && (
         <Pagination>
            {
               <LinkContainer
                  key={page - 1}
                  to={
                     !isAdmin
                        ? keyword
                           ? `/search/${keyword}/page/${page - 1}`
                           : `/page/${page - 1}`
                        : `/admin/productlist/${page - 1}`
                  }
                  disabled={page === 1}
               >
                  <Pagination.Prev style={{ color: 'red' }} />
               </LinkContainer>
            }
            {[...Array(pages).keys()].map((x) => (
               <LinkContainer
                  key={x + 1}
                  to={
                     !isAdmin
                        ? keyword
                           ? `/search/${keyword}/page/${x + 1}`
                           : `/page/${x + 1}`
                        : `/admin/productlist/${x + 1}`
                  }
               >
                  <Pagination.Item
                     active={x + 1 === page}
                     style={{ color: 'red', borderRadius: '1rem' }}
                  >
                     {x + 1}
                  </Pagination.Item>
               </LinkContainer>
            ))}
            {
               <LinkContainer
                  key={page + 1}
                  to={
                     !isAdmin
                        ? keyword
                           ? `/search/${keyword}/page/${page + 1}`
                           : `/page/${page + 1}`
                        : `/admin/productlist/${page + 1}`
                  }
                  disabled={page >= pages}
               >
                  <Pagination.Next />
               </LinkContainer>
            }
         </Pagination>
      )
   )
}

export default Paginate
