import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './loginbutton';
import LogoutButton from './logoutbutton';
import usePilots from '../../api/pilots';
import { useState} from 'react';
import { useEffect } from 'react';


export default function AuthenticationButton() {
  const pilotsApi = usePilots();
  const {
    isAuthenticated,
  } = useAuth0(); 
  const [pilot, setPilot] = useState({fName: '', lName: ''});


  useEffect(() => {
    if(!isAuthenticated) return;
    pilotsApi.getPilotById().then((pilot) => {setPilot(pilot)});
      //eslint-disable-next-line
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return (
      <div className="d-flex flex-row align-items-center">

        <div className="col">
          Signed in as: <u>{pilot.fName + ' ' + pilot.lName}</u>
        </div>
        <div className="col">
          <LogoutButton />
        </div>
      </div>
    );
  }

  return <LoginButton />;
}
