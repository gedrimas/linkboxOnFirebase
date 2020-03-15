import CON from '../constants'

const initialState = {
  token: '',
  isModalShow: false,
  registerError: '',
  authError: '',
  cookies: '',
}

const registration = (state = initialState, action) => {
  switch (action.type) {
    case (CON.REGISTRATION_START):
      return {
        ...state,
        token: 'pending',
      }
    case (CON.REGISTRATION_SUCCESS):
      return {
        ...state,
        token: `${action.payload.token}`,
        cookies: action.payload.cookies,
        
      }
    case (CON.REGISTRATION_FAILURE):
      return {
        ...state,
        registerError: action.payload,
      }

    case (CON.AUTHORIZATION_START):
      return {
        ...state,
        token: 'pending',
      }
/*     case (CON.AUTHORIZATION_SUCCESS):
      return {
        ...state,
        token: `${action.payload.token}`,
        cookies: action.payload.cookies,
        
      } */
    case (CON.AUTHORIZATION_FAILURE):
      return {
        ...state,
        authError: action.payload,
      }


    case (CON.SIGN_MODAL_SHOW):
      return {
        ...state,
        isModalShow: true,
      }
    case (CON.SIGN_MODAL_HIDE): 
      return {
        ...state,
        isModalShow: false,
      }
    case (CON.SIGN_OUT):
      return {
        ...state,
        token: '',
        ...initialState,
      }
    case (CON.TRIM_ERROR_MESSAGE):
      return {
        ...state,
        registerError: '', 
      }   
    default:
      return state
  }
}

export default registration
