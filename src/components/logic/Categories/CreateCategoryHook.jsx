import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUserAction } from '../../redux/actions/AuthAction';
import { createCategoryAction } from '../../../redux/actions/CategoriesAction';


export default function CreateCategoryHook() {
    const Dispatch=useDispatch();
    const navigate=useNavigate();
    
//States
const [title,setTitle]=useState('');
const [titleAr,setTitleAr]=useState('');
const [points,setPoints]=useState("");
const [cate,setCate]=useState("");
const [image,setImage]=useState("");
const [loading,setLoading]=useState(true);
const [press,setPress]=useState(true);


// methods 
const onChangeTitle=(e)=>{
    setTitle(e.target.value);
}

const onChangeTitleAr=(e)=>{
    setTitleAr(e.target.value);
}

const onChangePoints=(e)=>{
    setPoints(e.target.value);
}

const onChangeCate=(e)=>{
    setCate(e.target.value);
}

const onChangeImage=(e)=>{
    setImage(e.target.value);
}




//authReducer
const onSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true)
    await Dispatch(createCategoryAction({
        title: title,
        name_ar: titleAr,
        points: points,
        image: image,

    }))
    setLoading(false)

}
  






const res=useSelector(state=> state.AuthReducer.loginUser);

useEffect(()=>{
if(loading==false){
    if(res){
        if(res.status==200){
            setTimeout(() => {
                navigate("/categories");

            }, 1000);
        }else{
            alert("there are problem in creatipn")
        }
      
}
}
setLoading(true)
setPress(false)

},[loading])




  return [title,titleAr,points,cate,image,onChangeTitle,onChangeTitleAr,onChangePoints,onChangeCate,onChangeImage,onSubmit,loading,press]
}
