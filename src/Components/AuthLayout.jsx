import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authentication = true}){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        // TODO : Make it simple
    //   if(authStatus === false){
    //     navigate("/login")
    //   }else if(authStatus === true){
    //     navigate("/")
    //   }
      if (authentication && authStatus !== authentication) {
        navigate("/login")
      }else if (!authentication && authStatus != authentication) {
        navigate("/")
      }
      setLoading(false)
    }, [authentication, authStatus, navigate])
    
  return loading ? <h1>Loading...</h1> : <>{children}</>
}


