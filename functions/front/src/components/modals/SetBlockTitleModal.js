import React, { useState } from 'react'
import uniqid from 'uniqid'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Button,
  Badge,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styled from 'styled-components'

import { addBlock } from '../../store/actions/contentActions'

const StyledBadgeDiv = styled.div`
  position: fixed;
  margin: 5px 0px 0px 5px;
  z-index: 999;
  -webkit-backface-visibility: hidden;
`
const StyledBage = styled(Badge)`
  margin-bottom: 5px;
  :hover {
    cursor: pointer;
    outline: 1px solid #03F6FA;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px #010DFD;
    border-radius: 0;
  }
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
export default function SetBlockTitleModal() {
  const [show, setShow] = useState(false)
  const [blockTitle, setBlockTitle] = useState('')

  const currentState = useSelector(state => state.dnd)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const saveBlock = () => {
    const blockId = uniqid()
    const newBlock = {
      [blockId]: {
        id: blockId,
        title: blockTitle,
        linksIds: [],
      },
    }
    const objToArr = Object.entries(newBlock)
    const blockKey = objToArr[0][0]
    const blockBody = objToArr[0][1]

    dispatch(addBlock({ blockKey, blockBody }))
    setBlockTitle('')
    setShow(false)
  }


  return (
    <>
      <StyledBadgeDiv>
        <StyledBage
          pill
          variant="light"
          onClick={handleShow}
          style={{ marginRight: '5px' }}
        >
          Create new block
        </StyledBage>
      </StyledBadgeDiv>

      <StyledModal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please, enter title for your new block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              onChange={e => setBlockTitle(e.target.value)}
              value={blockTitle}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveBlock}>
            Create block
          </Button>
        </Modal.Footer>
      </StyledModal>
    </>
  );
}
