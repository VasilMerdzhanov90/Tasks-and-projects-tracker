import './Sidebar.css'

import AddIcon from '../assets/add_icon.svg'
import DashboardIcon from '../assets/dashboard_icon.svg'
import finish from '../assets/finish.svg'
import settings from '../assets/settings.svg'

import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
// import { useColor } from '../hooks/useColorTheme'
import { useCollection } from '../hooks/useCollection'


export default function Sidebar() {

    const { user } = useAuthContext();
    const { documents, error } = useCollection('users');

    // NEED TO REFACTOR THE USER SETTINGS !!!!!!!!!!!!!!!!!
    let color = '';

    if (documents) {
        const currentUser = documents.filter((x) => x.id === user.uid);
        color = currentUser[0].userSettings.sidebarColor
    }


    return (
        <div className='sidebar'
            style={{ background: color }}
        >
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user.photoURL} />
                    <p>Hello, {user.displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <img src={DashboardIcon} alt="" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="" />
                                <span>New Task</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/finished'>
                                <img src={finish} alt="" />
                                <span>Finished Tasks</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/settings'>
                                <img src={settings} alt="" />
                                <span>Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
