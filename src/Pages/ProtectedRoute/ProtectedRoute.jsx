import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export function ProtectedRoute(props) {
    let navigate=useNavigate();
 if(localStorage.getItem('userToken'))
 {
return props.children;
 }
 else{
     return <Navigate to={"/LogIn"}/> ;
    }
}

export default ProtectedRoute