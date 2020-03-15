import React, { useState, useEffect } from 'react'
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
import isUrl from 'is-valid-http-url'

import { addLink, dellBlock } from '../../store/actions/contentActions'

const ColumnControlBlock = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: -3px;
`
const StyledFooter = styled(Modal.Footer)`
  dispaly: flex;
  justify-content: space-between;
`
const StyledBage = styled(Badge)`
  margin-right: 5px;
  :hover {
    cursor: pointer;
    outline: 1px solid #03F6FA;
    outline-offset: 3px;
    box-shadow: 0 0 0 3px #010DFD;
    border-radius: 0;
  }
`
const StyledModal = styled(Modal)`
    @media only screen and (max-width: 600px) {
    width: 90vw;
    position: fixed;
    top: 25vw;
    height: 50% !important;
    left: ${props => props.clickPos - 50}px;
  }
  @media only screen (max-width: 800px){
    width: 50vw;
    position: fixed;
    top: 25vw
    left: 25vw;
    height: 50% !important;
  }
  `
export default function AddNewLinAndDelBlockkModals(props) {
  const { parentColumnId } = props
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [showWornDelModal, setShowWornDelModal] = useState(false)
  const [link, setLink] = useState('')
  const [wornMessage, setWornMessage] = useState('')
  const [clickPosition, setClickPosition] = useState('')

  const allLinks = useSelector(state => state.dnd.links)
  const dispatch = useDispatch()

  const delBlock = () => {
    dispatch(dellBlock(parentColumnId))
    setShowWornDelModal(false)
  }

  const saveLink = () => {
    for (let key in allLinks) {
      const { link: oneOfLinks } = allLinks[key]
      if (oneOfLinks === link) {
        setWornMessage('This link is already exist in your linkbox')
        return
      }
    }

    const linkId = uniqid()
    const newLink = {
      [linkId]: {
        id: linkId,
        link,
        showPics: true,
      },
    }


    const isValidUrl = isUrl(link)

    if (isValidUrl) {
      dispatch(addLink({ newLink, parentColumnId, linkId }))
      setLink('')
      setShowAddLinkModal(false)
    } else {
      setWornMessage((<span>This link is not valid. <br /> Please, enter correct URL.</span>))
    }
  }
  
  function printMousePos(event) {
    setClickPosition(event.clientX)
  }
  
  useEffect(() => {
    const result = [...document.querySelectorAll('div div div span')]
      .filter(a => a.textContent.includes('Add link'))
      .forEach(a => a.addEventListener('click', printMousePos))
  }, [clickPosition])

  const openAddLinkModal = () => {
    setShowAddLinkModal(true)
  }

  return (
    <>
      <ColumnControlBlock>
        <StyledBage
          variant="success"
          onClick={() => openAddLinkModal(true)}
        >
          Add link
        </StyledBage>
        <StyledBage
          variant="danger"
          style={{ width: '100%' }}
          onClick={() => setShowWornDelModal(true)}
        >
          Del column
        </StyledBage>
      </ColumnControlBlock>

      <StyledModal
        show={showAddLinkModal}
        onHide={() => setShowAddLinkModal(false)}
        clickPos={clickPosition}
        autoFocus={false}
        restoreFocus={false}
        enforceFocus={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Adding new link<br/>
            (for example: https://github.com/)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Link</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              onChange={e => setLink(e.target.value)}
              value={link}
            />
          </InputGroup>
        </Modal.Body>
        <StyledFooter>
          <div style={{ color: 'red' }}>
            {wornMessage}
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={() => setShowAddLinkModal(false)}
              style={{ marginRight: '5px' }}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => setLink('')}
              style={{ marginRight: '5px' }}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              onClick={saveLink}
            >
              Save
            </Button>
          </div>
        </StyledFooter>
      </StyledModal>
      <Modal show={showWornDelModal} onHide={() => setShowWornDelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting column</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete entire column <br /> with all link contained in it?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWornDelModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={delBlock}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
