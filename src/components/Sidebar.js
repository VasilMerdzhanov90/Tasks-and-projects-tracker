import './Sidebar.css'

import AddIcon from '../assets/add_icon.svg'
import DashboardIcon from '../assets/dashboard_icon.svg'
import finish from '../assets/finish.svg'
import settings from '../assets/settings-svgrepo-com.svg'

import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

import translation from '../translations/translation.json'

export default function Sidebar({ language }) {

    const { user, userData } = useAuthContext();
    const sidebarColor = userData?.userSettings.sidebarColor;

    return (
        <div className='sidebar' style={{ backgroundColor: sidebarColor }}>
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user.photoURL} />
                    <p>{translation[language].greeting}{user.displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <img src={DashboardIcon} alt="" />
                                <span>{translation[language].dashboard}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="" />
                                <span>{translation[language].newTask}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/finished'>
                                <img src={finish} alt="" />
                                <span>{translation[language].finishedTasks}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/settings'>
                                <img src={settings} alt="" />
                                <span>{translation[language].settings}</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
