import {Navbar, Nav, Row, Container} from "react-bootstrap";
import {FaGithub, FaLinkedin} from "react-icons/fa";

const Footer = () => (
  <Row className='mt-auto'>
    <Navbar variant='dark'>
      <Container className='d-flex flex-column'>
        <Nav>
          <Nav.Link href='https://github.com/Sanlung' className='footer-link'>
            <FaGithub />
          </Nav.Link>
          <Nav.Link
            href='https://www.linkedin.com/in/chung-kao/'
            className='footer-link'>
            <FaLinkedin />
          </Nav.Link>
          <Nav.Link
            href='https://sanlung.github.io/'
            className='footer-link footer-profile'>
            <img src='/img/chung-profile.jpeg' alt='Chung Kao profile' />
          </Nav.Link>
        </Nav>
        <Navbar.Text className='text-white'>
          &copy; {new Date().getFullYear()} by Chung Kao
        </Navbar.Text>
      </Container>
    </Navbar>
  </Row>
);

export default Footer;
