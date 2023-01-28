import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Settings.css'

export default function Settings() {
    const navigate = useNavigate('/');
    const colorSidebarOptions = ['#8d69f1', 'rgb(179, 179, 179)', 'rgb(110, 110, 249)', '#f5c773'];
    const colorMainOptions = ['#f4f4f4', 'rgba(229, 223, 255, 0.73)'];

    const categories = [
        { value: 'bg', label: 'Български' },
        { value: 'en', label: 'English' },
    ];

    const { user } = useAuthContext();

    const { updateDocument } = useFirestore('users');


    const [sidebarColor, setSidebarColor] = useState('#8d69f1');
    const [mainColor, setMainColor] = useState('#f4f4f4');
    const [language, setLanguage] = useState('en');


    const [isPending, setIsPending] = useState(false);

    const handleSaveChanges = () => {
        setIsPending(true)
        const userSettings = {
            sidebarColor,
            mainColor,
            language
        };
        // if (sidebarColor !== '#8d69f1') {
        //     userSettings.sidebarColor = sidebarColor;
        // }
        // if (mainColor !== '#f4f4f4') {
        //     userSettings.mainColor = mainColor;
        // }
        // if (language !== 'en') {
        //     userSettings.language = language;
        // };
        updateDocument(user.uid, { userSettings })
        setIsPending(false)
        navigate('/')
    }

    return (
        <div className="settings-container">
            <div className="settings">
                <p className="setting-title">Main language Selector:</p>
                <Select
                    className='select-lang'
                    onChange={(option) => setLanguage(option.value)}
                    options={categories}
                />
            </div>
            <div className="settings">
                <p className="setting-title">Theme color selector:</p>

                <div className="color-picker">
                    <p className='second-title'>Select sidebar color:</p>
                    {colorSidebarOptions.map(x => {
                        return (
                            <span
                                key={x}
                                style={{ backgroundColor: x }}
                                onClick={() => setSidebarColor(x)}
                                className="color"></span>
                        )
                    })}
                </div>

                <div className="color-picker">
                    <p className='second-title'>Select main color:</p>
                    {colorMainOptions.map(x => {
                        return (
                            <span
                                onClick={() => setMainColor(x)}
                                key={x}
                                style={{ backgroundColor: x }}
                                className="color"></span>
                        )
                    })}
                </div>
            </div>

            {isPending
                ? <button className='btn' disabled>Saving...</button>
                : <button
                    className='btn'
                    onClick={handleSaveChanges}
                >Save Changes</button>
            }
        </div>
    )
}
