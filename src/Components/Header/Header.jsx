import React from 'react'
import {Container, LogoutBtn, Logo, Button} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name : "Home",
      path : "/",
      active : true
    },
    {
      name : "Login",
      path : "/login",
      active : !authStatus
    },
    {
      name : "Signup",
      path : "/signup",
      active : !authStatus
    },
    {
      name : "All Posts",
      path : "/all-posts",
      active : authStatus
    },
    {
      name : "Add Post",
      path : "/add-post",
      active : authStatus
    }
  ]
  return (
    <header>
      <Container>
        <nav className='flex'>
          <div>
            <Link to="/">
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto gap-5'>
            {
              navItems.map((item) => 
                item.active && (
                  <li key={item.name}>
                    <Link to={item.path}>
                    
                    <Button className='bg-fuchsia-400/30 font-medium' onClick={() => {
                      console.log(item.path);
                      
                      navigate(item.path)}}>{item.name}</Button>
                      </Link>
                  </li>
                )
              )
            }
            {
              authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )
            }

          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
