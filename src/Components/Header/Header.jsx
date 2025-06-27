import React from "react";
import { Container, LogoutBtn, Logo, Button } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container className="bg-slate-900 py-2">
        <nav className="flex">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Logo width="10px" />
            </Link>
            {
              authStatus && <div className="flex flex-col items-start">
                <h4 className="text-fuchsia-100 font-medium text-2xl">{userData.name}</h4>
                <h2 className="text-fuchsia-100">{userData.email}</h2>
                </div>
              
            }
          </div>
          <ul className="flex ml-auto gap-5 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <Link to={item.path}>
                      <Button
                        className="bg-fuchsia-100 font-medium"
                        onClick={() => {
                          console.log(item.path);

                          navigate(item.path);
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <>
                <li>
                  <LogoutBtn />
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
