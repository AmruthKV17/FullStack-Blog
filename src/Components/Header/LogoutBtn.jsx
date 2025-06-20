import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth.js'
import { logout } from '../../features/Auth/authSlice.js'
import { useNavigate } from 'react-router-dom'


const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () =>{
        authService.logout().then((res) => {
            dispatch(logout())
            navigate('/');
            
        }).catch(()=>{
            console.log("Failed in logout");
            
        })

    }
  return (
    <button onClick={logoutHandler} className='inline-block bg-red-600/55 px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'>LogOut</button>
  )
}

export default LogoutBtn
