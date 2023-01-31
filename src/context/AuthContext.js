import { createContext, useReducer, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'


export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, userData: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    case 'USER_DATA':
      return { ...state, userData: action.payload }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    userData: null
  })

  const handleUserData = (id) => {
    projectFirestore
      .collection('users')
      .doc(id).get().then((doc) => {
        if (doc.exists) {
          dispatch({ type: 'USER_DATA', payload: doc.data() })
        }
      })
  }

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      // userDataSetter(user.uid)
      //payload last value was user!!!!!!!!!
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      if (user) {
        dispatch({ type: 'USER_DATA', payload: handleUserData(user.uid) })
      }
      unsub()
    })


  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )

}