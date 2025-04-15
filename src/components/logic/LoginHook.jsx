import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUserAction } from '../../redux/actions/AuthAction';


export default function LoginHook() {
    const Dispatch=useDispatch();
    const navigate=useNavigate();
    
//States
const [email,setEmail]=useState('');
const [pass,setPass]=useState('');
const [loading,setLoading]=useState(true);
const [press,setPress]=useState(false);
const [loadingGoogle,setLoadingGoogle]=useState(true);
const [emailMessage,setEmailMessage]=useState("");
const [passMessage,setPassMessage]=useState("");
const [generalMessage,setGeneralMessage]=useState("");
const emailLoginRef=useRef()
const passLoginRef=useRef()


// methods 
const onChangeEmail=(e)=>{
    setEmail(e.target.value);
}

const onChangePass=(e)=>{
    setPass(e.target.value);
}



//authReducer
const onSubmitLogin=async (e)=>{
    e.preventDefault();
    setPress(true)
    setLoading(true)
    await Dispatch(loginUserAction({
        email:email,
        password:pass,

    }))
    setLoading(false)

}
  






const res=useSelector(state=> state.AuthReducer.loginUser);

useEffect(()=>{
if(loading==false){
    if(res){
        console.log("res: ",res);
        if(res.status==200){
            if(res.data){
                localStorage.setItem("token",res.data.data.access_token)
                localStorage.setItem("user",JSON.stringify(res.data.data.admin))
                setGeneralMessage(res.data.message)
            }
            setTimeout(() => {
                window.location.href = "/";

            }, 1000);
        }else{
            localStorage.removeItem("token")
            localStorage.removeItem("user")

        }

        if(res.status==401 || res.status==200){
            setGeneralMessage(res.data.message)
        }else{
            setGeneralMessage("")

        }
}
}
setLoading(true)
setPress(false)

},[loading])




  return [email,pass,emailMessage,passMessage,generalMessage,emailLoginRef,passLoginRef,onChangeEmail,onChangePass,onSubmitLogin,loading,press]
}
