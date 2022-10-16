import {useState, useEffect, useCallback, useRef} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Authentication from "./components/auth/Authentication";
import BuildJobTable from "./components/jobTable/BuildJobTable";
import NotFound from "./components/layout/NotFound";
import useSemiPersistentState from "./persistState";

const App = () => {
  const [token, setToken] = useSemiPersistentState("token", null);
  const [user, setUser] = useSemiPersistentState("user", null);
  const jobsRef = useRef({
    items: ["loading"],
    isReverse: false,
    isFiltered: false,
  });
  const [jobs, setJobs] = useState(jobsRef.current);
  const [message, setMessage] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  //Message modal actions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    if (message) handleShow();
  }, [message]);

  // Get all the jobs from database
  const getJobs = useCallback(async () => {
    if (token) {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          jobsRef.current = {
            items: data.jobs,
            isReverse: false,
            isFiltered: false,
          };
          setJobs(jobsRef.current);
        } else {
          setMessage(data.msg);
        }
      } catch (err) {
        setMessage("A communications error occurred.");
      }
    }
  }, [token, BASE_URL]);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  // Sign up
  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.status === 201) {
        setMessage(`Registration successful. Welcome ${data.user.username}.`);
        setToken(data.token);
        setUser({name: data.user.username});
        await getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred.");
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password}),
      });
      const data = await response.json();

      if (response.status === 200) {
        setMessage(`Login successful. Welcome ${data.user.username}.`);
        setToken(data.token);
        setUser({name: data.user.username});
        await getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred.");
    }
  };

  // Log out
  const logOut = () => {
    setToken(null);
    setUser(null);
    setJobs({
      items: ["loading"],
      isReverse: false,
      isFiltered: false,
    });
    setMessage("You are logged out. Bye!");
    navigate("/auth/login");
  };

  // Add a job record
  const addJob = async (
    __,
    company,
    position,
    location,
    contact,
    email,
    status
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: company,
          position: position,
          location: location,
          email: email,
          contact: contact,
          status: status,
        }),
      });
      const data = await response.json();

      if (response.status === 201) {
        setMessage("The job entry was created.");
        await getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred.");
    }
  };

  // Upudate a job record
  const updateJob = async (
    jobId,
    company,
    position,
    location,
    contact,
    email,
    status
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: company,
          position: position,
          location: location,
          email: email,
          contact: contact,
          status: status,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setMessage("The job entry was updated.");
        await getJobs();
        navigate("/jobs");
      } else {
        setMessage(data.msg);
      }
    } catch (err) {
      setMessage("A communications error occurred.");
    }
  };

  //Delete a job record
  const removeJob = async (jobId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setMessage(data.msg);
      if (response.status === 200) {
        setMessage("The job entry was deleted.");
        await getJobs();
      }
    } catch (err) {
      setMessage("A communications error occurred.");
    }
  };

  const sortByDate = () => {
    // sort jobs by creation date
    jobs.isReverse
      ? jobs.items.sort((a, b) => {
          if (String(a.createdAt) < String(b.createdAt)) return -1;
          if (String(a.createdAt) > String(b.createdAt)) return 1;
          return 0;
        })
      : jobs.items.sort((a, b) => {
          if (String(a.createdAt) < String(b.createdAt)) return 1;
          if (String(a.createdAt) > String(b.createdAt)) return -1;
          return 0;
        });
    // set sort result in jobs state
    setJobs({
      items: jobs.items,
      isReverse: !jobs.isReverse,
      isFiltered: jobs.isFiltered,
    });
  };

  const filterByStatus = (status) => {
    // filter jobs by status
    let filtered = jobs.items.filter((job) => job.status === status);
    // set filter result in jobs state
    setJobs({
      items: filtered,
      isReverse: false,
      isFiltered: true,
    });
  };

  const searchContents = (searchTerm) => {
    // search all job info for search term
    let searchResult = jobs.items.filter((job) => {
      for (let attr in job) {
        if (typeof job[attr] === "string") {
          if (job[attr].toLowerCase().includes(searchTerm.toLowerCase()))
            return true;
        }
      }
      return false;
    });
    // set search result in jobs state
    setJobs({
      items: searchResult,
      isReverse: false,
      isFiltered: true,
    });
  };

  const unfilterJobs = () => setJobs(jobsRef.current);

  return (
    <Container fluid className='page-content min-vh-100 d-flex flex-column'>
      <Header
        user={user}
        token={token}
        onLogOut={logOut}
        onSearch={searchContents}
      />
      <Container className='main-content mb-5'>
        <div className='text-center my-5'>
          <h1 className='d-inline-block px-3 py-2 bg-light rounded shadow text-secondary'>
            {user ? <>My Job Applications</> : <>Job Applications Organizer</>}
          </h1>
        </div>
        <Routes>
          <Route path='auth'>
            <Route
              path='register'
              element={
                <Authentication onSignUp={register} onSetMessage={setMessage} />
              }
            />
            <Route
              path='login'
              element={
                <Authentication
                  isLogin
                  onLogin={login}
                  onSetMessage={setMessage}
                />
              }
            />
            <Route path='' element={<NotFound />} />
          </Route>
          <Route path='jobs'>
            <Route
              path='edit/:id'
              element={
                token ? (
                  <BuildJobTable
                    jobs={jobs}
                    onUpdate={updateJob}
                    onRemoveJob={removeJob}
                  />
                ) : (
                  <Navigate replace to='/auth/login' />
                )
              }
            />
            <Route
              path='new'
              element={
                token ? (
                  <BuildJobTable
                    isNew
                    jobs={jobs}
                    onUpdate={addJob}
                    onUnfilter={unfilterJobs}
                    onRemoveJob={removeJob}
                    onSetMessage={setMessage}
                  />
                ) : (
                  <Navigate replace to='/auth/login' />
                )
              }
            />
            <Route
              path=''
              element={
                token ? (
                  !jobs.items.length && !jobs.isFiltered ? (
                    <Navigate replace to='/jobs/new' />
                  ) : (
                    <BuildJobTable
                      jobs={jobs}
                      onSortByDate={sortByDate}
                      onFilter={filterByStatus}
                      onUnfilter={unfilterJobs}
                      onRemoveJob={removeJob}
                      onSetMessage={setMessage}
                    />
                  )
                ) : (
                  <Navigate replace to='/auth/login' />
                )
              }
            />
          </Route>
          <Route path='/' element={<Navigate replace to='/auth/login' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer className='text-end'>
          Click anywhere to dismiss the message.
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
