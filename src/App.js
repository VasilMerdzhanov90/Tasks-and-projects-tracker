import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { useCollection } from './hooks/useCollection';


//style
import './App.css'
//navbar
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
//links
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import OnlineUsers from './components/OnlineUsers';
import Finished from './pages/finished/Finished';
import Settings from './pages/settings/Settings';


function App() {

    const { user, authIsReady } = useAuthContext();


    const { documents } = useCollection('users');

    // NEED TO REFACTOR THE USER SETTINGS !!!!!!!!!!!!!!!!!
    let color = '';

    if (documents && user !== null) {
        const currentUser = documents.filter((x) => x.id === user.uid);
        color = currentUser[0].userSettings.mainColor
    }

    return (
        <div className="App" style={{ background: color }}>

            {authIsReady && (
                <BrowserRouter>
                    {user && <Sidebar />}
                    <div className='container'>
                        <Navbar />
                        <Routes>
                            <Route
                                path='/'
                                element={user ? <Dashboard /> : <Navigate to='/login' />}
                            />
                            <Route
                                path='/create'
                                element={user ? <Create /> : <Navigate to='/login' />}
                            />
                            <Route
                                path='/login'
                                element={user ? <Navigate to='/' /> : <Login />}
                            />
                            <Route
                                path='/signup'
                                element={user ? <Navigate to='/' /> : <Signup />}
                            />
                            <Route
                                path='/projects/:id'
                                element={user ? <Project /> : <Navigate to='/login' />}
                            />
                            <Route
                                path='/finished'
                                element={user ? <Finished /> : <Navigate to='/login' />}
                            />
                            <Route
                                path='/settings'
                                element={user ? <Settings /> : <Navigate to='/login' />}
                            />
                        </Routes>
                    </div>
                    {user && <OnlineUsers />}
                </BrowserRouter>
            )}
        </div>
    );
}

export default App
