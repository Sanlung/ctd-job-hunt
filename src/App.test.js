import * as React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {render, screen, act, fireEvent} from "@testing-library/react";
// import useSemiPersistentState from "./persistState";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NotFound from "./components/layout/NotFound";
import InputWithLabel from "./components/auth/InputWithLabel";
import SignUpForm from "./components/auth/SignUpForm";
import LoginForm from "./components/auth/LoginForm";
import Authentication from "./components/auth/Authentication";
import JobTableInput from "./components/jobTable/JobTableInput";
import JobTableForm from "./components/jobTable/JobTableForm";
import JobTableRow from "./components/jobTable/JobTableRow";
import JobTableRows from "./components/jobTable/JobTableRows";
import JobTable from "./components/jobTable/JobTable";
import BuildJobTable from "./components/jobTable/BuildJobTable";
import App from "./App";

/*
Declare mock jobs data
*/

const job1 = {
  _id: "1234",
  company: "PayPal",
  position: "Software Engineer",
  location: "Mountain View, CA",
  contact: "Chris Rowes",
  email: "chrisrowes@paypal.com",
  status: "eligible",
  createdAt: "2022-10-03",
  updatedAt: "2022-10-04",
};
// Pending integration test
// const job2 = {
//   _id: "5678",
//   company: "Zoom",
//   position: "UI Designer",
//   location: "Palo applicationA",
//   contact: "James Johnson",
//   email: "jamesjohnson@zoom.com",
//   status: "applied",
//   createdAt: "2022-10-05",
//   updatedAt: "2022-10-06",
// };

/*
Unit test - functions - deficient
*/

// useSemiPersistentState
// describe("useSemiPersistentState", () => {
//   test("setToken stores token in sessionStorage", () => {
//     const [token, setToken] = useSemiPersistentState("token", null);
//     const newToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzMxOTlkOWFjZjkzMjhkZmIzZjlmOGMiLCJ1c2VybmFtZSI6IkNodW5nIEthbyIsImlhdCI6MTY2NDE5NjI1MCwiZXhwIjoxNjY2Nzg4MjUwfQ.sUE8U4mu_sL9UX9axRLtBETxj3YRVNGn3C2licg5j7s";

//     setToken(newToken);
//     const expectedToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzMxOTlkOWFjZjkzMjhkZmIzZjlmOGMiLCJ1c2VybmFtZSI6IkNodW5nIEthbyIsImlhdCI6MTY2NDE5NjI1MCwiZXhwIjoxNjY2Nzg4MjUwfQ.sUE8U4mu_sL9UX9axRLtBETxj3YRVNGn3C2licg5j7s";

//     expect(token).toStrictEqual(expectedToken);
//   });

//   test("setUser stores user info in sessionStorage", () => {
//     const [user, setUser] = useSemiPersistentState("user", null);
//     const newUser = {
//       username: "Mike Johnson",
//       email: "mikejohnson@yahoo.com",
//       password: "San#3Lung?",
//     };

//     setUser(newUser);
//     const expectedUser = {
//       username: "Mike Johnson",
//       email: "mikejohnson@yahoo.com",
//       password: "San#3Lung?",
//     };

//     expect(user).toStrictEqual(expectedUser);
//   });
// });

/*
Unit test - components
*/

/* Layout */

// Header
describe("Header", () => {
  const headerProps = {
    user: {name: "Chung Kao"},
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    onLogOut: jest.fn(),
    onSearch: jest.fn(),
  };

  test("renders brand image with proper attributes", () => {
    render(<Header {...headerProps} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/img/jobhunt-logo.jpeg"
    );
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Job Hunt app logo");
  });

  test("renders all associated child elements", () => {
    render(<Header {...headerProps} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getAllByRole("button")[0]).toHaveClass("navbar-toggler");
    expect(screen.getAllByRole("button")[1]).toHaveAttribute("type", "submit");
    expect(screen.getAllByRole("button")[2]).toHaveClass("nav-link");
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveClass("nav-link");
  });

  test("renders search form when logged in", () => {
    render(<Header {...headerProps} />);

    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("search-box");
  });

  test("brand image links to '/jobs' route when logged in", () => {
    render(<Header {...headerProps} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/jobs");
  });

  test("renders log out link when logged in", () => {
    render(<Header {...headerProps} />);

    expect(screen.getAllByRole("button")[2]).toHaveTextContent("Log out");
  });

  test("brand image links to '/auth/login' when logged out", () => {
    headerProps.token = null;
    render(<Header {...headerProps} />);

    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      "/auth/login"
    );
  });

  test("renders login link when logged out", () => {
    headerProps.user = null;
    render(<Header {...headerProps} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/auth/login"
    );
  });
});

// Footer
describe("Footer", () => {
  test("renders a proper copyright statement", () => {
    render(<Footer />);

    expect(
      screen.getByText(`© ${new Date().getFullYear()} by Chung Kao`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`© ${new Date().getFullYear()} by Chung Kao`)
    ).toHaveClass("text-white");
  });

  test("renders three anchor tags with proper classes", () => {
    render(<Footer />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getAllByRole("link")[0]).toHaveClass("footer-link");
    expect(screen.getAllByRole("link")[1]).toHaveClass("footer-link");
    expect(screen.getAllByRole("link")[2]).toHaveClass("footer-profile");
  });
});

// NotFound
describe("NotFound", () => {
  test("renders 404 not-found text in three paragraphs", () => {
    render(<NotFound />);

    expect(screen.getByText(/Whoops/)).toBeInTheDocument();
    expect(screen.getByText(/does not exist/)).toBeInTheDocument();
    expect(screen.getByText(/Please try again/)).toBeInTheDocument();
  });
});

/* Auth */

// InputWithLabel
describe("InputWithLabel", () => {
  const inputWithLabelProps = {
    isFocused: true,
    name: "email",
    type: "email",
    value: "al.jumbo@yahoo.com",
    placeholder: "Email",
    onSetValue: jest.fn(),
    children: "Email",
  };

  test("renders a label, text and input box", () => {
    render(<InputWithLabel {...inputWithLabelProps} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveFocus();
    expect(screen.getByDisplayValue("al.jumbo@yahoo.com")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
});

// SignUpForm
describe("SignUpForm", () => {
  const signUpFormProps = {
    onSignUp: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("renders a form", () => {
    render(<SignUpForm {...signUpFormProps} />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveValue("Sign Up");
  });

  test("renders four input groups with labels", () => {
    render(<SignUpForm {...signUpFormProps} />);

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(screen.getByText("username")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();
    expect(screen.getByText("password")).toBeInTheDocument();
    expect(screen.getByText("password1")).toBeInTheDocument();
    expect(screen.getByText(/Username should be 6 to 15/)).toBeInTheDocument();
  });
});

// LoginForm
describe("LoginForm", () => {
  const loginFormProps = {
    onLogin: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("renders a form", () => {
    render(<LoginForm {...loginFormProps} />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getAllByRole("button")[0]).toHaveValue("Login");
    expect(screen.getAllByRole("button")[1]).toHaveTextContent(
      "Don't have an account?"
    );
    expect(screen.getAllByRole("button")[2]).toHaveTextContent("Sign Up");
  });

  test("renders two input groups with labels", () => {
    render(<LoginForm {...loginFormProps} />);

    expect(screen.getByText(/Track Your Job/)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();
    expect(screen.getByText("password")).toBeInTheDocument();
  });
});

// Authentication
describe("Authentication", () => {
  const authenticationProps = {
    isLogin: true,
    onLogin: jest.fn(),
    onSignUp: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("renders the LoginForm when isLogin is true", () => {
    render(<Authentication {...authenticationProps} />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByText(/Track Your Job/)).toBeInTheDocument();
  });

  test("renders the SignUpForm when isLogin is false", () => {
    authenticationProps.isLogin = false;

    render(<Authentication {...authenticationProps} />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByText(/Username should be 6 to 15/)).toBeInTheDocument();
  });
});

/* JobTable */

// JobTableInput
describe("JobTableInput", () => {
  const jobTableInputProps = {
    isFocused: false,
    name: "username",
    type: "text",
    value: "Username",
    onSetValue: jest.fn(),
  };

  test("renders an <input> element with appropriate attributes", () => {
    render(<JobTableInput {...jobTableInputProps} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Username");
    expect(screen.getByRole("textbox")).toHaveClass("no-style");
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "username");
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  test("focus the <input> element when isFocused is passed in", () => {
    jobTableInputProps.isFocused = true;
    render(<JobTableInput {...jobTableInputProps} />);

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

// JobTableForm;
describe("JobTableForm", () => {
  const jobTableFormProps = {
    isNew: false,
    job: job1,
    onUpdate: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("renders a table row and 9 table cells containing form fields", () => {
    render(<JobTableForm {...jobTableFormProps} />);

    expect(screen.getAllByRole("row")).toHaveLength(1);
    expect(screen.getAllByRole("cell")).toHaveLength(9);
    expect(screen.getAllByRole("textbox")).toHaveLength(5);
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
    expect(screen.getAllByRole("option")).toHaveLength(4);
    expect(screen.getAllByRole("textbox")[0]).toHaveValue("PayPal");
    expect(screen.getAllByRole("textbox")[1]).toHaveValue("Software Engineer");
    expect(screen.getAllByRole("textbox")[2]).toHaveValue("Mountain View, CA");
    expect(screen.getAllByRole("textbox")[3]).toHaveValue("Chris Rowes");
    expect(screen.getAllByRole("textbox")[4]).toHaveValue(
      "chrisrowes@paypal.com"
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("eligible");
    expect(screen.getAllByRole("cell")[6]).toHaveTextContent("10-03-22");
    expect(screen.getAllByRole("cell")[7]).toHaveTextContent("10-04-22");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});

// JobTableRow
describe("JobTableRow", () => {
  const jobTableRowProps = {
    job: job1,
  };

  test("renders a table row and 9 table cells with correct info", () => {
    render(<JobTableRow {...jobTableRowProps} />);

    expect(screen.getAllByRole("row")).toHaveLength(1);
    expect(screen.getAllByRole("cell")).toHaveLength(9);
    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("PayPal");
    expect(screen.getAllByRole("cell")[1]).toHaveTextContent(
      "Software Engineer"
    );
    expect(screen.getAllByRole("cell")[2]).toHaveTextContent(
      "Mountain View, CA"
    );
    expect(screen.getAllByRole("cell")[3]).toHaveTextContent("Chris Rowes");
    expect(screen.getAllByRole("cell")[4]).toHaveTextContent(
      "chrisrowes@paypal.com"
    );
    expect(screen.getAllByRole("cell")[5]).toHaveTextContent("eligible");
    expect(screen.getAllByRole("cell")[6]).toHaveTextContent("10-03-22");
    expect(screen.getAllByRole("cell")[7]).toHaveTextContent("10-04-22");
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});

// JobTableRows;
describe("JobTableRows", () => {
  const jobTableRowsProps = {
    jobId: null,
    jobs: [job1],
    onUpdate: jest.fn(),
    onShowModal: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("renders jobs.length number of rows", () => {
    render(<JobTableRows {...jobTableRowsProps} />);

    expect(screen.getAllByRole("row")).toHaveLength(1);
  });

  test("renders a form row if jobId is passed in", () => {
    jobTableRowsProps.jobId = "1234";
    render(<JobTableRows {...jobTableRowsProps} />);

    expect(screen.getAllByRole("textbox")).toHaveLength(5);
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
  });
});

// JobTable
describe("JobTable", () => {
  const jobTableProps = {
    isNew: false,
    jobId: null,
    jobs: {
      items: [job1],
      isReverse: false,
      isFiltered: false,
    },
    onUpdate: jest.fn(),
    onSOrtByDate: jest.fn(),
    onFilter: jest.fn(),
    onShowModal: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("renders a table of jobs.length number of rows", () => {
    render(<JobTable {...jobTableProps} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveClass("shadow border-info");
    expect(screen.getAllByRole("rowgroup")).toHaveLength(2);
    expect(screen.getAllByRole("row")).toHaveLength(2);
    expect(screen.getAllByRole("columnheader")).toHaveLength(9);
    expect(screen.getAllByRole("cell")).toHaveLength(9);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  test("renders the Status column header as <select> on normal view", () => {
    render(<JobTable {...jobTableProps} />);

    expect(screen.getAllByRole("columnheader")[5]).toHaveClass("filter-select");
    expect(screen.getAllByRole("columnheader")[5]).toHaveTextContent(
      "Statuseligibleappliedintervieweddeclined"
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(5);
  });

  test("renders the Created column header clickable sort on normal view", () => {
    render(<JobTable {...jobTableProps} />);

    expect(screen.getAllByRole("columnheader")[6]).toHaveClass("sort-button");
  });

  test("renders the Status column header as text on filter mode", () => {
    jobTableProps.jobs.isFiltered = true;

    render(<JobTable {...jobTableProps} />);

    expect(screen.getAllByRole("columnheader")[5]).toHaveTextContent("Status");
  });

  test("renders the Created column header clickable sort on filter mode", () => {
    render(<JobTable {...jobTableProps} />);

    expect(screen.getAllByRole("columnheader")[6]).toHaveClass("sort-button");
  });
});

// BuildJobTable
describe("BuildJobTable", () => {
  const buildJobTableProps = {
    isNew: false,
    jobs: {
      items: ["loading"],
      isReverse: false,
      isFiltered: false,
    },
    onUpdate: jest.fn(),
    onSortByDate: jest.fn(),
    onFIlter: jest.fn(),
    onUnfilter: jest.fn(),
    onRemoveJob: jest.fn(),
    onSetMessage: jest.fn(),
  };

  test("render a container <div> and displays 'Loading...' while fetching data", () => {
    render(<BuildJobTable {...buildJobTableProps} />);

    expect(screen.getByTestId("jobtable-container")).toHaveTextContent(
      "Loading ..."
    );
    expect(screen.getByTestId("jobtable-container")).toBeInTheDocument();
    expect(screen.getByTestId("jobtable-container")).toHaveClass(
      "shadow-lg rounded p-4 mb-5 bg-light"
    );
  });

  test("displays correct message when no job to display", () => {
    buildJobTableProps.jobs.items = [];

    render(<BuildJobTable {...buildJobTableProps} />);

    expect(screen.getByTestId("jobtable-container")).toHaveTextContent(
      /Let's get started/
    );
  });

  test("displays the '+' button when on normal view", () => {
    render(<BuildJobTable {...buildJobTableProps} />);

    expect(screen.getAllByRole("button")[0]).toHaveAttribute(
      "href",
      "/jobs/new"
    );
  });

  test("displays correct message when no job to display on filter", () => {
    buildJobTableProps.jobs.isFiltered = true;

    render(<BuildJobTable {...buildJobTableProps} />);

    expect(screen.getByTestId("jobtable-container")).toHaveTextContent(
      /You don't have any/
    );
  });

  test("displays the 'All jobs' button when on filter", () => {
    render(<BuildJobTable {...buildJobTableProps} />);

    expect(screen.getAllByRole("button")[1]).toHaveTextContent("All jobs");
  });
});

// App
describe("App", () => {
  describe("before logging in", () => {
    test("renders header and footer", () => {
      render(
        <Router>
          <App />
        </Router>
      );

      expect(screen.getAllByRole("navigation")).toHaveLength(2);
    });

    test("renders register/login interface", () => {
      render(
        <Router>
          <App />
        </Router>
      );

      expect(
        screen.getByText("Job Applications Organizer")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Track Your Job Applications/)
      ).toBeInTheDocument();
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByRole("presentation")).toBeInTheDocument();
      expect(screen.getByRole("group")).toBeInTheDocument();
    });
  });

  describe("after logging in", () => {
    beforeAll(() => {
      sessionStorage.setItem("user", JSON.stringify({name: "Chung Kao"}));
      sessionStorage.setItem(
        "token",
        JSON.stringify(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzMxZDEyZGZlMzJkODRjNzI5MjEzMmMiLCJ1c2VybmFtZSI6IkNodW5nIEthbyIsImlhdCI6MTY2NjI0MjI0MywiZXhwIjoxNjY2MzI4NjQzfQ.r3YK7M9IdaTNzZ1pHVD9O0LH7MQboitbsw905JL-VOo"
        )
      );
    });

    afterAll(() => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    });

    test("renders the job table form when logged in", () => {
      render(
        <Router>
          <App />
        </Router>
      );

      expect(screen.getByText("My Job Applications")).toBeInTheDocument();
      expect(screen.getByTestId("jobtable-container")).toBeInTheDocument();
      expect(screen.getByTestId("jobtable-container")).toHaveTextContent(
        "Loading ..."
      );
    });
  });
});

/*
Integration Test - App
*/

// Pending
