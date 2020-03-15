import CON from '../constants'
import { saveUserChanges } from './authRegActions'
import getActualStateAndSaveToDb from './accessory'

export function addBlockAction(newBlock) {
  return {
    type: CON.ADD_BLOCK,
    payload: newBlock,
  }
}

export function addBlock(newBlock) {
  return (dispatch, getState) => {
    dispatch(addBlockAction(newBlock))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

export function addLinkAction(newLink) {
  return {
    type: CON.ADD_LINK,
    payload: newLink,
  }
}

export function addLink(newLink) {
  return (dispatch, getState) => {
    dispatch(addLinkAction(newLink))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

export function deletLinkAction(linkParams) {
  return {
    type: CON.DEL_LINK,
    payload: linkParams,
  }
}

export function hidePicsAction(linkParams) {
  return {
    type: CON.HIDE_PICS,
    payload: linkParams,
  }
}

export function hidePics(linkParams) {
  return (dispatch, getState) => {
    dispatch(hidePicsAction(linkParams))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

export function dellLink(linkParams) {
  return (dispatch, getState) => {
    dispatch(deletLinkAction(linkParams))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

export function deletBlockAction(blockParams) {
  return {
    type: CON.DEL_BLOCK,
    payload: blockParams,
  }
}

export function dellBlock(blockParams) {
  return (dispatch, getState) => {
    dispatch(deletBlockAction(blockParams))
    getActualStateAndSaveToDb(getState, saveUserChanges)
  }
}

