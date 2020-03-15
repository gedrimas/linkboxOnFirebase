import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Column from './Column'
import {
  moveColumn,
  moveLinkInsideColumn,
  startMoveLinkBetweenColumns,
  finishMoveLinkBetweenColumns,
} from '../store/actions/dndActions'

import SetBlockTitleModal from './modals/SetBlockTitleModal';

const Container = styled.div`
  display: flex;
`

export default function MainPage() {
  const [startColumnIndex, setStartColumnIndex] = useState()
  const [isSetBlockTitleModalShow, setBlockTitleModalShow] = useState(false)

  const data = useSelector(state => state.dnd)

  const dispatch = useDispatch()

  
  const onDragStart = (start) => {
    const startColumn = data.columnOrder.indexOf(start.source.droppableId)
    setStartColumnIndex(startColumn)
  }
  const onDragUpdate = (update) => {
    const { destination } = update
  }

  const onDragEnd = (result) => {

    setStartColumnIndex(null)

    const {destination, source, draggableId, type} = result 
    if (!destination) {
      return
    }

    if(destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if(type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)
      dispatch(moveColumn(newColumnOrder))
      return
    }
    
    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]
    if(start === finish){
      const newLinksIds = Array.from(start.linksIds)
      newLinksIds.splice(source.index, 1)
      newLinksIds.splice(destination.index, 0, draggableId)
      dispatch(moveLinkInsideColumn(start.id, newLinksIds))
      return
    }

    const startLinksIds = Array.from(start.linksIds)
    startLinksIds.splice(source.index, 1)
    const finishLinksIds = Array.from(finish.linksIds)
    finishLinksIds.splice(destination.index, 0, draggableId)
    dispatch(startMoveLinkBetweenColumns(start.id, startLinksIds))
    dispatch(finishMoveLinkBetweenColumns(finish.id, finishLinksIds))
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <SetBlockTitleModal />
      <Droppable
        droppableId="all-columns"
        direction="horizontal"
        type="column"
      >
        {provided => (
          <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId]
              const links = column.linksIds.map(linkId => data.links[linkId])

              return (
                <Column
                  key={column.id}
                  column={column}
                  links={links}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
