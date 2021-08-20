import { useState } from 'react'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`

function Loader() {
  let [loading, setLoading] = useState(true)
  let [color, setColor] = useState('orange')

  return (
    <div className='sweet-loading text-center'>
      <ClipLoader color={color} loading={loading} css={override} size={60} />
    </div>
  )
}

export default Loader
