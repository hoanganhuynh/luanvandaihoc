import { React, useState } from 'react'
import { Form, Button, Image, InputGroup } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'
import { ButtonBase, FormGroup, Input } from '@material-ui/core'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import ClearIcon from '@material-ui/icons/Clear'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandle = (e) => {
    // setKeyword(transcript)
    e.preventDefault()
    if (keyword.trim()) {
      if (keyword) {
        history.push(`/search/${keyword}`)
      } else {
        history.push(`/search/${transcript}`)
      }
    } else {
      history.push('/')
    }
  }

  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const click = () => {
    if (transcript) {
      setKeyword(transcript)
    }
  }

  const clear = () => {
    setKeyword(' ')
    resetTranscript()
  }

  return (
    <Form onSubmit={submitHandle} inline>
      <div className='d-flex align-items-center'>
        <Form.Control
          type='text'
          name='q'
          placeholder='Tìm kiếm sản phẩm.'
          className='mr-sm-2 ml-sm-5 rounded-pill'
          onChange={(e) => setKeyword(e.target.value)}
          value={transcript ? transcript : keyword}
          style={{ width: '30rem' }}
        ></Form.Control>
        <Button
          variant='outline-light'
          className='p-1 text-dark border-0'
          style={{ marginLeft: '-14%', height: '2rem' }}
          onClick={clear}
        >
          <ClearIcon />
        </Button>

        <Button
          variant='outline-light'
          onClick={SpeechRecognition.startListening}
          className='p-1 text-dark border-0'
          style={{ marginLeft: '-10%', fontSize: '1rem' }}
        >
          <i className='fa fa-microphone' />
        </Button>
      </div>

      <Button
        type='submit'
        className='p-2 btn-search rounded-circle'
        style={{ fontSize: '0.7rem', marginLeft: '-15%' }}
        onClick={click}
      >
        <SearchIcon />
      </Button>
    </Form>
  )
}

export default SearchBox
