export const getActualStateAndSaveToDb = (getState, saveUserChanges) => {
  const {
    dnd,
    registration: {
      token,
      cookies: {
        name: name
      }
    },
  } = getState()
  const newUserState = {}
  newUserState.state = dnd
  newUserState.name = name
  if (token) saveUserChanges(token, newUserState)
}
export default getActualStateAndSaveToDb
