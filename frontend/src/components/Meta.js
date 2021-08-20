import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='description' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Chào mừng đến cây cảnh shop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta
