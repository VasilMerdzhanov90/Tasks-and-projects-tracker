import './Settings.css'

import Select from 'react-select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';


export default function Settings() {
    const { user } = useAuthContext();
    const { updateDocument } = useFirestore('users');
    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);

    const [language, setLanguage] = useState(null);
    const [sidebarColor, setSidebarColor] = useState(null);
    const [mainTheme, setMainTheme] = useState(null);


    const handleSaveSettings = () => {
        setIsPending(true)
        if (language === null || sidebarColor === null || mainTheme === null) {
            return
        }
        const userSettings = {
            language: language.value,
            sidebarColor: sidebarColor.color,
            mainTheme: mainTheme.value
        };
        updateDocument(user.uid, { userSettings });
        setIsPending(false);
        navigate('/');
    }

    const options = [
        { value: 'bg', label: 'Български' },
        { value: 'en', label: 'English' }
    ];
    const optionsMainScreenColor = [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' }
    ];
    const optionsSidebarColor = [
        { color: 'rgb(141, 105, 241)', label: 'purple' },
        { color: 'rgb(179, 179, 179)', label: 'gray' },
        { color: 'rgb(110, 110, 249)', label: 'blue' },
        { color: 'rgb(245, 199, 115)', label: 'yellow' }
    ];

    return (
        <div className="settings-container">

            <div className="language">
                <p>Select main language:</p>
                <Select
                    options={options}
                    onChange={(option) => setLanguage(option)}
                />
            </div>
            <div className="sidebar-color">
                <p>Select sidebar color:</p>
                {optionsSidebarColor.map((x) => {
                    return (
                        <span
                            className='span-color'
                            key={x.color}
                            onClick={() => setSidebarColor(x)}
                            style={{ backgroundColor: x.color }}
                        />
                    )
                })}
            </div>
            <div className="main-color">
                <p>Select main screen color:</p>
                <Select
                    options={optionsMainScreenColor}
                    onChange={(option) => setMainTheme(option)}
                />
            </div>
            {language
                && sidebarColor
                && mainTheme
                ? <p className='msg'>You selected: {language.label}, sidebar color as {sidebarColor.label} and {mainTheme.label} theme.</p>
                : <p className='msg'>Please select all options!</p>
            }
            <p className='error msg'>AFTER CHANGES, YOU NEED TO REFRESH YOUR BROWSER!</p>

            {isPending ?
                <button className='btn btn-settings'>Saving...</button>
                : <button
                    className='btn btn-settings'
                    onClick={handleSaveSettings}
                >
                    Save settings
                </button>
            }
        </div>
    )
}
