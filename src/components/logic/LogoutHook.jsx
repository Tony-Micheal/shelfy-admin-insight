import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/actions/AuthAction';

const LogoutHook = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);

    //authReducer
const onSubmitLogout=async (e)=>{
    e.preventDefault();
    setLoading(true)
    await dispatch(logoutAction())
    setLoading(false)

}
const res=useSelector(state=> state.AuthReducer.logoutUser);

useEffect(()=>{
    if(loading==false){
        if(res){
            console.log(res);
            if(res.status==200){
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    localStorage.removeItem("pass")
    
                setTimeout(() => {
                    window.location.replace('/sos');
                }, 1000);
            }
        setLoading(true)
    }
    }
    },[loading])
    
      return [onSubmitLogout]
}

export default LogoutHook
