import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      const currentUser = await projectFirestore
        .collection('users')
        .doc(res.user.uid);

      currentUser.get().then((doc) => {
        if (doc.exists) {
          dispatch({ type: 'USER_DATA', payload: doc.data() })
        }
      })
      //setting user to online status = true!!!
      //we get the id from the res!!!!
      await projectFirestore
        .collection('users')
        .doc(res.user.uid)
        .update({ online: true });
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}