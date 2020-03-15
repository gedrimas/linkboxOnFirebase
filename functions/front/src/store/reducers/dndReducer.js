
import CON from '../constants'
import { state as initialState } from '../../data/initialState'

const dnd = (state = initialState, action) => {
  switch (action.type) {
    case CON.SET_USER_DATA:
      return {
        ...action.payload,
      } 
    case CON.ADD_BLOCK:
      state.columnOrder.push(action.payload.blockKey)
      return {
        ...state, columns: {
          ...state.columns, [action.payload.blockKey]: action.payload.blockBody,
        },
      }
    case CON.ADD_LINK:
      state.columns[action.payload.parentColumnId].linksIds.push(action.payload.linkId)
      return {
        ...state, links: {
          ...state.links, [action.payload.linkId]: action.payload.newLink[action.payload.linkId],
        },
      }
    case CON.HIDE_PICS:
      return {
        ...state, links: {
          ...state.links, [action.payload.id]: {
            ...state.links[action.payload.id], showPics: !state.links[action.payload.id].showPics,
          }
        },
      }
    case CON.DEL_LINK:
      delete state.links[action.payload.id]
      return {
        ...state, columns: {
          ...state.columns,
          [action.payload.parentBlock]: {
            ...state.columns[action.payload.parentBlock], linksIds: action.payload.arrOfLinksIds,
          },
        },
      }
    case CON.DEL_BLOCK:
      const linksToBeDeleted = state.columns[action.payload].linksIds
      for (let i = 0; i < linksToBeDeleted.length; i++) {
        delete state.links[linksToBeDeleted[i]]
      }
      delete state.columns[action.payload]
      state.columnOrder.splice(state.columnOrder.findIndex(item => item === action.payload), 1)
      return {
        ...state,
      }  
    case CON.MOVE_COLUMN:
      return {
        ...state, columnOrder: action.payload,
      }
    case CON.MOVE_LINK_INSIDE_COLUMN:
      return {
        ...state, columns: {
          ...state.columns, [action.columnId]: {
            ...state.columns[action.columnId], linksIds: action.payload
          }
        }
      }
    case CON.START_MOVE_LINK_BETWEEN_COLUMNS:
      return {
        ...state, columns: {
          ...state.columns, [action.startColumn]: {
            ...state.columns[action.startColumn], linksIds: action.startColumnLinksOrder 
          } 
        }
      }
    case CON.FINISH_MOVE_LINK_BETWEEN_COLUMNS:
      return {
        ...state, columns: {
          ...state.columns,
          [action.finishColumn]: {
            ...state.columns[action.finishColumn], linksIds: action.finishColumnLinksOrder
          },
        },
      }
    case (CON.SIGN_OUT):
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default dnd
