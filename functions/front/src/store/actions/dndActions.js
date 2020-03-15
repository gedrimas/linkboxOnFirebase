import CON from '../constants'
import { saveUserChanges } from './authRegActions'
import getActualStateAndSaveToDb from './accessory'

export function moveColumnAction(newColumnOrder) {
  return {
    type: CON.MOVE_COLUMN,
    payload: newColumnOrder,
  }
}

export function moveColumn(newColumnOrder) {
  return (dispatch, getState) => {
    dispatch(moveColumnAction(newColumnOrder))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

export function moveLinkInsideColumnAction(id, newLinkOrder) {
  return {
    type: CON.MOVE_LINK_INSIDE_COLUMN,
    columnId: id,
    payload: newLinkOrder,
  }
}

export function moveLinkInsideColumn(id, newLinkOrder) {
  return (dispatch, getState) => {
    dispatch(moveLinkInsideColumnAction(id, newLinkOrder))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

export function startMoveLinkBetweenColumns(startColumn, startColumnLinksOrder) {
  return {
    type: CON.START_MOVE_LINK_BETWEEN_COLUMNS,
    startColumn,
    startColumnLinksOrder,
  }
}

export function finishMoveLinkBetweenColumnsAction(finishColumn, finishColumnLinksOrder) {
  return {
    type: CON.FINISH_MOVE_LINK_BETWEEN_COLUMNS,
    finishColumn,
    finishColumnLinksOrder,
  }
}

export function finishMoveLinkBetweenColumns(finishColumn, finishColumnLinksOrder) {
  return (dispatch, getState) => {
    dispatch(finishMoveLinkBetweenColumnsAction(finishColumn, finishColumnLinksOrder))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}
