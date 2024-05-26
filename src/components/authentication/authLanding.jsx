import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import LoginButton from './loginbutton';
import usePilots from '../../api/pilots';
import Error from '../Error';



const AuthLanding = () =>{
  const { error, isAuthenticated, isLoading } = useAuth0();
  const pilotsApi = usePilots();
  
  if (error) {
    return (
      <>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Login failed</h1>
          <Error error={error}/>
          <LoginButton />
        </div>
      </div>
    </div>
    </>
    );
  }

  if (!isLoading && isAuthenticated) {
    pilotsApi.register();
    
    return <><Navigate to="/" /></>;
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Login required</h1>
            <p>You need to login to access this page.</p>
            <LoginButton />
          </div>
        </div>
      </div>
      </>
    );
  }
  
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Signing in</h1>
          <p>
            Please wait while we sign you in!
            
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default AuthLanding;