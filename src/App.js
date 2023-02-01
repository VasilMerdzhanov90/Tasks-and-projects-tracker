import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


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

    const { user, authIsReady, userData } = useAuthContext();

    const colors = {
        dark: '#adadad',
        light: '#f4f4f4'
    };

    const containerColor = userData?.userSettings.mainTheme;
    const language = userData?.userSettings.language;

    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    {user && userData && <Sidebar language={language} />}
                    <div className='container' style={{ backgroundColor: colors[containerColor] }}>
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
                    {user && userData && <OnlineUsers color={colors[containerColor]}  language={language} />}
                </BrowserRouter>
            )}
        </div>
    );
}

export default App
