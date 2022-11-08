import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Logo from "../../assets/logo.png";

const Navbar1 = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img src={Logo} className="mr-1 w-10 h-10" alt="Flowbite Logo" />
          <h2 className="font-bold text-2xl">Touristics</h2>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/services">Services</Link>
          {user ? (
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="" img={user?.photoURL} rounded={true} />}
              >
                <Dropdown.Header>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar1;
