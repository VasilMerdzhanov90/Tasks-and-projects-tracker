import './Settings.css'

import Select from 'react-select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

import translation from '../../translations/translation.json';

export default function Settings({ lang }) {

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
                <p>{translation[lang].settingsMainLanguage}:</p>
                <Select
                    options={options}
                    onChange={(option) => setLanguage(option)}
                />
            </div>
            <div className="sidebar-color">
                <p>{translation[lang].settingsSidebarColor}:</p>
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
                <p>{translation[lang].settingsMainTheme}:</p>
                <Select
                    options={optionsMainScreenColor}
                    onChange={(option) => setMainTheme(option)}
                />
            </div>

            {language ?
                <p className='msg'>You selected: {language.label}</p>
                : <p className='msg'>{translation[lang].languageMsg}</p>
            }

            {sidebarColor ?
                <p className='msg'>sidebar color as {sidebarColor.label}</p>
                : <p className='msg'>{translation[lang].sidebarMsg}</p>
            }

            {mainTheme ?
                <p className='msg'>and {mainTheme.label} theme</p>
                : <p className='msg'>{translation[lang].mainThemeMsg}</p>
            }

            <p className='error msg'>{translation[lang].afterChangesMsg}</p>

            {isPending ?
                <button className='btn btn-settings'>{translation[lang].savePengingBtn}</button>
                : <button
                    className='btn btn-settings'
                    onClick={handleSaveSettings}
                >
                    {translation[lang].saveSettingsBtn}
                </button>
            }
        </div>
    )
}
