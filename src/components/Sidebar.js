import './Sidebar.css'

import AddIcon from '../assets/add_icon.svg'
import DashboardIcon from '../assets/dashboard_icon.svg'
import finish from '../assets/finish.svg'
import settings from '../assets/settings-svgrepo-com.svg'

import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Sidebar() {

    const { user } = useAuthContext();

    return (
        <div className='sidebar'>
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
