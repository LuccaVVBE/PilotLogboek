import './App.css';
import React from 'react';
import DashBoard from './components/dashboard';
import Profile from './components/profile/profile';
import Navbar from './components/navbar';
import {Routes, Route, useLocation} from 'react-router-dom';
import RequireAuth from './components/authentication/requireAuth';
import AuthLanding from './components/authentication/authLanding';
import LicenseOverview from './components/profile/licenseoverview';
import Plane from './components/planes/planeoverview';
import Error from './components/Error';
import {useState} from 'react';
import HomePage from './components/home'

function App() {
  const [error, setError] = useState(null);
  const handleError = async (error) => {
    if(error.includes("Network")){
      error = "Error connecting to the server. Any changes will not be saved, please try again later.";
    }
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 5500);
  }


  return (
    <div className="App">
      <Navbar/>
      <Error error={error} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={(<RequireAuth><DB setError={handleError}/></RequireAuth>)} />
        <Route path="/login" element={<AuthLanding />} />
        <Route path="/profile" element={(<RequireAuth><Prof /></RequireAuth>)} />
        <Route path="/planes" element={(<RequireAuth><Planes /></RequireAuth>)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  );
}

function Home(){
  
  return(
    <>
    <HomePage />

    
    
    </>
  )
}

function DB({setError}){
  return(
    <>

    <DashBoard setError={setError}/>
    </>
  )
}

function NotFound(){
  const {pathname} = useLocation();
  return(
    <>
    <h1>404</h1>
    <p>Er is geen pagina met als url {pathname}, probeer iets anders.</p>
    </>
  )
}

function Prof(){
  return(
    <>
    <Profile/>
    <LicenseOverview/>
    </>
  )
}

function Planes(){
  return(
    <>

    <Plane/>
    </>
  )
}
export default App;

function Footer() {
  return (
    <div className="footer">
      <p>© 2022 Pilot logger - Created By Lucca Van Veerdeghem</p>
    </div>
  );
}