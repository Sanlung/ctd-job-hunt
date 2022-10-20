import {useState} from "react";
import {
  Navbar,
  Nav,
  InputGroup,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import {FaUser, FaSearch} from "react-icons/fa";

const Header = ({user, token, onLogOut, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm !== "") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <Navbar expand='md' fixed='top' variant='dark' className='shadow'>
      <Container>
        <Navbar.Brand>
          <Nav.Link href={token ? "/jobs" : "/auth/login"}>
            <img src='/img/jobhunt-logo.jpeg' alt='Job Hunt app logo' />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
          <Nav>
            {token ? (
              <Nav.Item className='me-3 mt-1'>
                <Form role='search' onSubmit={handleSearch}>
                  <InputGroup>
                    <Button type='submit' variant='secondary' size='sm'>
                      <FaSearch />
                    </Button>
                    <Form.Control
                      className='search-box text-secondary'
                      value={searchTerm}
                      placeholder='Search'
                      aria-label='searchbox'
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Form>
              </Nav.Item>
            ) : (
              <></>
            )}

            <Navbar.Text className='text-white'>
              <FaUser /> {user ? user.name : "Welcome"}
            </Navbar.Text>
            <Nav.Item>
              {user ? (
                <Nav.Link onClick={(e) => onLogOut()}>Log out</Nav.Link>
              ) : (
                <Nav.Link href='/auth/login'>Login</Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
