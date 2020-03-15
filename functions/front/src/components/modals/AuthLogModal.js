import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import {
  Modal,
  Button,
  Tab,
  Row,
  Col,
  Nav,
  InputGroup,
  FormControl,
  Badge,
} from 'react-bootstrap'
import ReCaptchaComponent from '../ReCaptchaComponent'
import { registration, authorization, signOut, showSignModal, hideSignModal, trimErrorMessage } from '../../store/actions/authRegActions'

const StyledBadgeDiv = styled.div`
  position: fixed;
  margin: 5px 0px 0px 125px;
  z-index: 999;
`
const StyledBage = styled(Badge)`
  margin-bottom: 5px;
  :hover {
    cursor: pointer;
    outline: 1px solid #03F6FA;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px #010DFD;
    border-radius: 0;
  }
`
const StyledFooter = styled(Modal.Footer)`
  dispaly: flex;
  justify-content: space-between;
`


const StyledModal = styled(Modal)`
  @media only screen and (max-width: 600px) {
    width: 90vw;
    position: fixed;
    top: 25vw
    left: 5vw;
    height: 50% !important;
  }
  @media only screen (max-width: 800px){
    width: 50vw;
    position: fixed;
    top: 25vw
    left: 25vw;
    height: 50% !important;
  }
`

export default function AuthLogModal(props) {
  const [regName, setRegName] = useState('')
  const [regPass, setRegPass] = useState('')
  const [logName, setLogName] = useState('')
  const [logPass, setLogPass] = useState('')
  const [action, setAction] = useState('first')
  const [logButtonText, setLogButtonText] = useState('Sign in')
  const [isFetchData, setFetchData] = useState(true)
  const [wornMessage, setWornMessage] = useState('')
  
  const [cookies, setCookies] = useCookies(['linkBoxName', 'linkBoxPass'])

  const dispatch = useDispatch()

  const token = useSelector(state => state.registration.token)
  const registerError = useSelector(state => state.registration.registerError)
  const userCookies = useSelector(state => state.registration.cookies)


  const state = useSelector(state => state)

  const signInOrOutAndDellCookies = () => {
    if (logButtonText === 'Sign in'){
      dispatch(showSignModal())
    }else{
      dispatch(signOut())
      setCookies('linkBoxName', '')
      setCookies('linkBoxPass', '')
    }
  }

  useEffect(() => {
    if (token) {
      setLogButtonText('Sign out')
    } else {
      setLogButtonText('Sign in')
    }
  })

  useEffect(() => {
    if (token !== 'pending' && token && !registerError) {
      setCookies('linkBoxName', userCookies.name)
      setCookies('linkBoxPass', userCookies.pass)
      props.setModalShow(false)
    }else {
      setCookies('linkBoxName', '')
      setCookies('linkBoxPass', '')
    }
  }, [token])

  useEffect(() => {
    if(registerError) setWornMessage(registerError.err)
  })

  useEffect(() => {
    let screenObj = window.screen
  })

  const handleRegOrAuthButton = () => {
    if (action === 'first') {
      if (!regName || !regPass) {
        setWornMessage('Fields should not be empty')
        return
      }
      dispatch(registration({ regName, regPass }))
    } else if (action === 'second') {
      if (!logName || !logPass) {
        setWornMessage('Fields should not be empty')
        return
      }
      dispatch(authorization({ logName, logPass }))
    }
    setLogName('')
    setLogPass('')
    setRegName('')
    setRegPass('')
    setWornMessage('')
    dispatch(trimErrorMessage(''))

  }

  const setNameForRegistration = (e) => {
    if (wornMessage) {
      setWornMessage('')
      dispatch(trimErrorMessage())
    }
    setRegName(e)
  }

  return (
    <>
      <StyledBadgeDiv>
        <StyledBage
          pill
          variant="dark"
          onClick={signInOrOutAndDellCookies}
          >
          {logButtonText}
        </StyledBage>
      </StyledBadgeDiv>
      <ReCaptchaComponent>
        <StyledModal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Welcome to LinkBox!
              <Nav.Link 
                href="https://www.youtube.com/watch?v=UIZIwzr1ocA&feature=youtu.be"
                style={{
                  color: 'red', 
                  padding: '0',
                  fontSize: '12px',
                }}
              >
                See how to use
              </Nav.Link>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="first"
                        onSelect={(selected) => { 
                          setAction(selected) 
                          setWornMessage('')
                          dispatch(trimErrorMessage(''))
                        }}
                      >
                          Registr your new LinkBox
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="second"
                        onSelect={(selected) => { 
                          setAction(selected) 
                          setWornMessage('')
                          dispatch(trimErrorMessage(''))                       
                        }}
                        style={{ marginBottom: '17px' }}
                      >
                          Enter to your LinkBox
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-default">set your login</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          onChange={e => setNameForRegistration(e.target.value)}
                          value={regName}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-default">set password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          type="password"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          onChange={e => setRegPass(e.target.value)}
                          value={regPass}
                        />
                      </InputGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-default">
                            Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          onChange={e => setLogName(e.target.value)}
                          value={logName}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          type="password"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          onChange={e => setLogPass(e.target.value)}
                          value={logPass}
                        />
                      </InputGroup>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
          <StyledFooter>
            <div style={{ color: 'red' }}>
              {wornMessage}
            </div>
              <Button
                onClick={handleRegOrAuthButton}
              >
                {action === 'first' ? 'Registr' : 'Sign in'}
              </Button>
          </StyledFooter>
        </StyledModal>
      </ReCaptchaComponent>
    </>
  )
}
