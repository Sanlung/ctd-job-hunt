import {Link} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import {FaUser} from "react-icons/fa";

const Header = ({user, onLogOut}) => (
  <Navbar expand='md' fixed='top' variant='dark' className='shadow'>
    <Container>
      <Navbar.Brand>
        <Link to='/jobs'>
          <img src='/img/jobhunt-logo.jpeg' alt='Job Hunt app logo' />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
        <Nav>
          <Navbar.Text className='text-white'>
            <FaUser /> {user ? user.name : "Welcome"}
          </Navbar.Text>
          {user ? (
            <Nav.Link onClick={(e) => onLogOut()}>Log out</Nav.Link>
          ) : (
            <Nav.Link href='/auth/login'>Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
