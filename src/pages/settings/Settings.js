import './Settings.css'

export default function Settings() {

    const colorSidebarOptions = ['#8d69f1', 'red', 'blue', 'orange'];
    const colorMainOptions = ['#f4f4f4', 'lightsalmon', 'lightgray', 'lightyellow'];



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
                            <span style={{ backgroundColor: x }} className="color"></span>
                        )
                    })}
                </div>

                <div className="color-picker">
                    <p className='second-title'>Select main color:</p>
                    {colorMainOptions.map(x => {
                        return (
                            <span style={{ backgroundColor: x }} className="color"></span>
                        )
                    })}
                </div>
            </div>
            <button className='btn'>Save Changes</button>
        </div>
    )
}
