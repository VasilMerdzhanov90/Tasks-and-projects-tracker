import './Sidebar.css'

import AddIcon from '../assets/add_icon.svg'
import DashboardIcon from '../assets/dashboard_icon.svg'
import finish from '../assets/finish.svg'
import settings from '../assets/settings.svg'

import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

import translation from '../translations/translation.json';

export default function Sidebar({ currentUser, lang, sidebarColor }) {



    const { user } = useAuthContext();

    return (
        <div className='sidebar' style={{ background: sidebarColor }}>
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user.photoURL} />
                    <p>{translation[lang].greeting} {user.displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <img src={DashboardIcon} alt="" />
                                <span>{translation[lang].dashboard}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="" />
                                <span>{translation[lang].newTask}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/finished'>
                                <img src={finish} alt="" />
                                <span>{translation[lang].finishedTasks}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/settings'>
                                <img src={settings} alt="" />
                                <span>{translation[lang].settings}</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )

}
