import './Signup.css'
import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    //error states
    const [thumbnailError, setThumbnailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [whitespaceError, setWhitespaceError] = useState('');

    //email validator with regexp
    const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    //import the hook for signup
    const { signup, isPending, error } = useSignup();

    //all inputs
    let allInputs = [email, password, repeatPassword, displayName];


    //errors check
    const handlePasswordCheck = (e) => {
        if (repeatPassword !== password) {
            setPasswordError('Passwords don\'t match!')
            return
        }
        setPasswordError('')
    }

    const handleFileChange = (e) => {
        setThumbnail(null);

        let selected = e.target.files[0];

        if (!selected) {
            setThumbnailError('Please select a file!')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('File must be an image!')
            return
        }
        if (selected.size > 250000) {
            setThumbnailError('Image file size must be less than 250kb');
            return
        }
        setThumbnail(selected);
        setThumbnailError('');

        console.log('thumbnail updated')
    }

    const handleEmailValidation = (e) => {
        if (!validateEmail.exec(e.target.value)) {
            setEmailError('Email is not valid!')
            console.log('invalid')
            return
        } else {
            setEmailError('');
        }
    }

    const validateWhitespace = (arr) => {
        let isErrorWhitespace = false;
        arr.forEach((element, index) => {
            if (element.includes(' ')) {
                setWhitespaceError('Input\'s must NOT include any whitespace!')
                isErrorWhitespace = true;
            } else {
                setWhitespaceError('')
                isErrorWhitespace = false;
            }
        });
        return isErrorWhitespace
    }

    //submit
    const handleSubmit = (e) => {
        e.preventDefault();
        //checking for whitespace in inputs
        if (validateWhitespace(allInputs)) {
            return
        }
        if (passwordError !== '' || thumbnailError !== '') {
            console.log('invalid inputs')
            return
        }
        signup(email, password, displayName, thumbnail)
    }



    return (
        <form
            className='auth-form'
            onSubmit={handleSubmit}
        >
            <h2>Signup</h2>
            <label>
                <span>username:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailValidation}
                    value={email}
                />
                {emailError && <p className='error'>{emailError}</p>}
            </label>
            <label>
                <span>password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>repeat password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                    onBlur={handlePasswordCheck}
                />
                {passwordError && <div className='error'>{passwordError}</div>}
            </label>
            <label>
                <span>profile thumbnail:</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {!isPending && <button className='btn'>Signup</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {whitespaceError && <p className='error'>{whitespaceError}</p>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
