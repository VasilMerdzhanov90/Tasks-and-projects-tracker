import './Settings.css'

import Select from 'react-select';
import { useState } from 'react';


export default function Settings() {

    const [language, setLanguage] = useState('en');
    const [sidebarColor, setSidebarColor] = useState('en');
    const [mainColor, setMainColor] = useState('en');


    const options = [
        { value: 'bg', label: 'Български' },
        { value: 'en', label: 'English' }
    ];
    const optionsMainScreenColor = [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' }
    ];
    const optionsSidebarColor = [
        { color: 'rgb(141, 105, 241)' },
        { color: 'rgb(179, 179, 179)' },
        { color: 'rgb(110, 110, 249)' },
        { color: 'rgb(245, 199, 115)' }
    ];

    return (
        <div className="settings-container">

            <div className="language">
                <p>Select main language:</p>
                <Select
                    options={options}
                    onChange={(e) => setLanguage(e.target.value)}
                />
            </div>
            <div className="sidebar-color">
                <p>Select sidebar color:</p>
                {optionsSidebarColor.map((x) => {
                    return (
                        <span
                            className='span-color'
                            key={x.color}
                            style={{ backgroundColor: x.color }}
                             />
                    )
                })}
            </div>
            <div className="main-color">
                <p>Select main screen color:</p>
                <Select
                    options={optionsMainScreenColor}
                    onChange={(e) => setMainColor(e.target.value)}
                />
            </div>
        </div>
    )
}
