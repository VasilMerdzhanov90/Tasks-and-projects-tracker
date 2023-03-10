import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // signup
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            //upload photo image for the avatar in firebase storage
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
            const img = await projectStorage.ref(uploadPath).put(thumbnail);

            const imgUrl = await img.ref.getDownloadURL();

            // add display name and thumbnail to the user
            await res.user.updateProfile({
                displayName,
                photoURL: imgUrl
            })

            //create a user document
            await projectFirestore
                .collection('users')
                .doc(res.user.uid)
                .set({
                    online: true,
                    displayName,
                    photoURL: imgUrl,
                    userSettings: {
                        language: 'en',
                        sidebarColor: 'rgb(141, 105, 241)',
                        mainTheme: 'light'
                    }
                });


            const currentUser = await projectFirestore
                .collection('users')
                .doc(res.user.uid);

            currentUser.get().then((doc) => {
                if (doc.exists) {
                    dispatch({ type: 'USER_DATA', payload: doc.data() })
                }
            })



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

    return { signup, error, isPending }
}