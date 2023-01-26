import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import './Settings.css'
// import { useColor } from '../../hooks/useColorTheme'

export default function Settings() {

    const colorSidebarOptions = ['#8d69f1', '#dddcdc', '#4f4ff3', '#f5c773'];
    const colorMainOptions = ['#f4f4f4', 'rgb(215, 210, 210)'];


    const { user } = useAuthContext();
    
    const { updateDocument } = useFirestore('users');

    // const { changeSidebarColor, changeMainColor } = useColor()

    // const [sidebarColor, setSidebarColor] = useState('#8d69f1');
    // const [mainColor, setMainColor] = useState('#f4f4f4');
    
    const [sidebarColor, setSidebarColor] = useState('');
    const [mainColor, setMainColor] = useState('');

    const [isPending, setIsPending] = useState(false);

    const handleSaveChanges = () => {
        setIsPending(true)
        const userSettings = {
            sidebarColor,
            mainColor
        };
        updateDocument(user.uid, { userSettings })
        setIsPending(false)
    }

    return (
        <div className="settings-container">
            <div className="settings">
                <p className="setting-title">Main language Selector:</p>
                <select>
                    <option value="ENGLISH" key="eng">English</option>
                    <option value="БЪЛГАРСКИ" key="bg">Български</option>
                </select>
            </div>
            <div className="settings">
                <p className="setting-title">Theme color selector:</p>

                <div className="color-picker">
                    <p className='second-title'>Select sidebar color:</p>
                    {colorSidebarOptions.map(x => {
                        return (
                            <span
                                // onClick={() => changeSidebarColor(x)}
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
