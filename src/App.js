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


function App() {

    const { user, authIsReady } = useAuthContext();


    return (
        <div className="App">

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
                        </Routes>
                    </div>
                    {user && <OnlineUsers />}
                </BrowserRouter>
            )}
        </div>
    );
}

export default App
