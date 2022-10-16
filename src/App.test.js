import * as React from "react";
// import {BrowserRouter as Router} from "react-router-dom";
import {render, screen} from "@testing-library/react";
// import useSemiPersistentState from "./persistState";
// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
// import NotFound from "./components/layout/NotFound";
// import InputWithLabel from "./components/auth/InputWithLabel";
// import SignUpForm from "./components/auth/SignUpForm";
// import LoginForm from "./components/auth/LoginForm";
// import Authentication from "./components/auth/Authentication";
// import JobTableRow from "./components/jobTable/JobTableRow";
import JobTableRows from "./components/jobTable/JobTableRows";

/*
Declare mock test data
*/

/*
Unit test - functions
*/
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
// describe("Header", () => {
//   const headerProps = {
//     user: {name: "Chung Kao"},
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
//     onLogOut: jest.fn(),
//     onSearch: jest.fn(),
//   };

//   test("renders brand image with proper attributes", () => {
//     render(<Header {...headerProps} />);

//     expect(screen.getByRole("img")).toBeInTheDocument();
//     expect(screen.getByRole("img")).toHaveAttribute(
//       "src",
//       "/img/jobhunt-logo.jpeg"
//     );
//     expect(screen.getByRole("img")).toHaveAttribute("alt", "Job Hunt app logo");
//   });

//   test("renders all associated child elements", () => {
//     render(<Header {...headerProps} />);

//     expect(screen.getByRole("navigation")).toBeInTheDocument();
//     expect(screen.getAllByRole("button")).toHaveLength(3);
//     expect(screen.getAllByRole("button")[0]).toHaveClass("navbar-toggler");
//     expect(screen.getAllByRole("button")[1]).toHaveAttribute("type", "submit");
//     expect(screen.getAllByRole("button")[2]).toHaveClass("nav-link");
//     expect(screen.getByRole("link")).toBeInTheDocument();
//     expect(screen.getByRole("link")).toHaveClass("nav-link");
//   });

//   test("renders search form when logged in", () => {
//     render(<Header {...headerProps} />);

//     expect(screen.getByRole("search")).toBeInTheDocument();
//     expect(screen.getByRole("textbox")).toBeInTheDocument();
//     expect(screen.getByRole("textbox")).toHaveClass("search-box");
//   });

//   test("brand image links to '/jobs' route when logged in", () => {
//     render(<Header {...headerProps} />);

//     expect(screen.getByRole("link")).toHaveAttribute("href", "/jobs");
//   });

//   test("renders log out link when logged in", () => {
//     render(<Header {...headerProps} />);

//     expect(screen.getAllByRole("button")[2]).toHaveTextContent("Log out");
//   });

//   test("brand image links to '/auth/login' when logged out", () => {
//     headerProps.token = null;
//     render(<Header {...headerProps} />);

//     expect(screen.getAllByRole("link")[0]).toHaveAttribute(
//       "href",
//       "/auth/login"
//     );
//   });

//   test("renders login link when logged out", () => {
//     headerProps.user = null;
//     render(<Header {...headerProps} />);

//     expect(screen.getAllByRole("link")).toHaveLength(2);
//     expect(screen.getAllByRole("link")[1]).toHaveAttribute(
//       "href",
//       "/auth/login"
//     );
//   });
// });

// Footer
// describe("Footer", () => {
//   test("renders a proper copyright statement", () => {
//     render(<Footer />);

//     expect(
//       screen.getByText(`© ${new Date().getFullYear()} by Chung Kao`)
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText(`© ${new Date().getFullYear()} by Chung Kao`)
//     ).toHaveClass("text-white");
//   });

//   test("renders three anchor tags with proper classes", () => {
//     render(<Footer />);

//     expect(screen.getAllByRole("link")).toHaveLength(3);
//     expect(screen.getAllByRole("link")[0]).toHaveClass("footer-link");
//     expect(screen.getAllByRole("link")[1]).toHaveClass("footer-link");
//     expect(screen.getAllByRole("link")[2]).toHaveClass("footer-profile");
//   });
// });

// NotFound
// describe("NotFound", () => {
//   test("renders 404 not-found text in three paragraphs", () => {
//     render(<NotFound />);

//     expect(screen.getByText(/Whoops/)).toBeInTheDocument();
//     expect(screen.getByText(/does not exist/)).toBeInTheDocument();
//     expect(screen.getByText(/Please try again/)).toBeInTheDocument();
//   });
// });

/* Auth */

// InputWithLabel
// describe("InputWithLabel", () => {
//   const inputWithLabelProps = {
//     isFocused: true,
//     name: "email",
//     type: "email",
//     value: "al.jumbo@yahoo.com",
//     placeholder: "Email",
//     onSetValue: jest.fn(),
//     children: "Email",
//   };

//   test("renders a label, text and input box", () => {
//     render(<InputWithLabel {...inputWithLabelProps} />);

//     expect(screen.getByRole("textbox")).toBeInTheDocument();
//     expect(screen.getByRole("textbox")).toHaveFocus();
//     expect(screen.getByDisplayValue("al.jumbo@yahoo.com")).toBeInTheDocument();
//     expect(screen.getByText("Email")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
//   });
// });

// SignUpForm
// describe("SignUpForm", () => {
//   const signUpFormProps = {
//     onSignUp: jest.fn(),
//     onSetMessage: jest.fn(),
//   };

//   test("renders a form", () => {
//     render(<SignUpForm {...signUpFormProps} />);

//     expect(screen.getByRole("presentation")).toBeInTheDocument();
//     expect(screen.getByRole("button")).toBeInTheDocument();
//     expect(screen.getByRole("button")).toHaveValue("Sign Up");
//   });

//   test("renders four input groups with labels", () => {
//     render(<SignUpForm {...signUpFormProps} />);

//     expect(screen.getAllByRole("textbox")).toHaveLength(2);
//     expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
//     expect(screen.getByText("username")).toBeInTheDocument();
//     expect(screen.getByText("email")).toBeInTheDocument();
//     expect(screen.getByText("password")).toBeInTheDocument();
//     expect(screen.getByText("password1")).toBeInTheDocument();
//     expect(screen.getByText(/Username should be 6 to 15/)).toBeInTheDocument();
//   });
// });

// LoginForm
// describe("LoginForm", () => {
//   const loginFormProps = {
//     onLogin: jest.fn(),
//     onSetMessage: jest.fn(),
//   };

//   test("renders a form", () => {
//     render(<LoginForm {...loginFormProps} />);

//     expect(screen.getByRole("presentation")).toBeInTheDocument();
//     expect(screen.getAllByRole("button")).toHaveLength(3);
//     expect(screen.getAllByRole("button")[0]).toHaveValue("Login");
//     expect(screen.getAllByRole("button")[1]).toHaveTextContent(
//       "Don't have an account?"
//     );
//     expect(screen.getAllByRole("button")[2]).toHaveTextContent("Sign Up");
//   });

//   test("renders two input groups with labels", () => {
//     render(<LoginForm {...loginFormProps} />);

//     expect(screen.getByText(/Track Your Job/)).toBeInTheDocument();
//     expect(screen.getByRole("textbox")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
//     expect(screen.getByText("email")).toBeInTheDocument();
//     expect(screen.getByText("password")).toBeInTheDocument();
//   });
// });

// Authentication
// describe("Authentication", () => {
//   const authenticationProps = {
//     isLogin: true,
//     onlOgin: jest.fn(),
//     onSignUp: jest.fn(),
//     onSetMessage: jest.fn(),
//   };

//   test("renders the LoginForm when isLogin is true", () => {
//     render(<Authentication {...authenticationProps} />);

//     expect(screen.getByRole("presentation")).toBeInTheDocument();
//     expect(screen.getByText(/Track Your Job/)).toBeInTheDocument();
//   });

//   test("renders the SignUpForm when isLogin is false", () => {
//     authenticationProps.isLogin = false;

//     render(<Authentication {...authenticationProps} />);

//     expect(screen.getByRole("presentation")).toBeInTheDocument();
//     expect(screen.getByText(/Username should be 6 to 15/)).toBeInTheDocument();
//   });
// });

/* JobTable */

// JobTableRow
// describe("JobTableRow", () => {
//   const jobTableRowProps = {
//     job: {
//       company: "PayPal",
//       position: "Software Engineer",
//       location: "Mountain View, CA",
//       contact: "Chris Rowes",
//       email: "chrisrowes@paypal.com",
//       status: "eligible",
//       createdAt: "2022-10-03",
//       updatedAt: "2022-10-04",
//     },
//   };

//   test("renders 1 table row and 9 table cells with correct info", () => {
//     render(<JobTableRow {...jobTableRowProps} />);

//     expect(screen.getAllByRole("row")).toHaveLength(1);
//     expect(screen.getAllByRole("cell")).toHaveLength(9);
//     expect(screen.getAllByRole("cell")[0]).toHaveTextContent("PayPal");
//     expect(screen.getAllByRole("cell")[1]).toHaveTextContent(
//       "Software Engineer"
//     );
//     expect(screen.getAllByRole("cell")[2]).toHaveTextContent(
//       "Mountain View, CA"
//     );
//     expect(screen.getAllByRole("cell")[3]).toHaveTextContent("Chris Rowes");
//     expect(screen.getAllByRole("cell")[4]).toHaveTextContent(
//       "chrisrowes@paypal.com"
//     );
//     expect(screen.getAllByRole("cell")[5]).toHaveTextContent("eligible");
//     expect(screen.getAllByRole("cell")[6]).toHaveTextContent("10-03-22");
//     expect(screen.getAllByRole("cell")[7]).toHaveTextContent("10-04-22");
//     expect(screen.getAllByRole("button")).toHaveLength(2);
//   });
// });

// JobTableRows
describe("JobTableRows", () => {
  const jobTableRowsProps = {
    jobId: null,
    jobs: [
      {
        _id: "1234",
        company: "PayPal",
        position: "Software Engineer",
        location: "Mountain View, CA",
        contact: "Chris Rowes",
        email: "chrisrowes@paypal.com",
        status: "eligible",
        createdAt: "2022-10-03",
        updatedAt: "2022-10-04",
      },
    ],
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
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
