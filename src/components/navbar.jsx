import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import AuthenticationButton from './authentication/authenticationbutton';

function NavBar() {
  return (
    <Navbar bg="light" expand='sm' data-cy="nav-bar">
       <Navbar.Toggle />
      <Navbar.Collapse >
        <Navbar.Brand>@ Pilot logger</Navbar.Brand>
        <Nav.Link href="/" data-cy="nav-home">Home</Nav.Link>
        <Nav.Link href="/dashboard" data-cy="nav-dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/profile" data-cy="nav-profile">Profile</Nav.Link>
        <Nav.Link href="/planes" data-cy="nav-planes">Planes</Nav.Link>
       
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <AuthenticationButton/>
          </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>

    </Navbar>
  );
}

export default NavBar;