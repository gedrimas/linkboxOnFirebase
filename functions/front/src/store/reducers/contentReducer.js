const content = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COLUMN':
      return {
        ...state,
        columnName: action.payload,
      }
    case 'ADD_LINK_DESCRIPTION':
      return {
        ...state,
        linkDescription: action.payload,
      }
    case 'ADD_LINK':
      return {
        ...state,
        link: action.link,
      } 
    default:
      return state
  }
}
export default content
