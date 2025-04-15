import axios from "axios";
import baseURL from "../API/baseURL";
const usePostDataWithDifferentFormat=async (url,params)=>{
    const config={
        headers:{"content-type":"multipart/form-data",Authorization:`Bearer ${localStorage.getItem('token')}`}
    }
    const res= await baseURL.post(url,params,config)
    return res;
}
const usePostData=async (url,params)=>{
    const config={
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    }
    const res= await baseURL.post(url,params,config)
    return res;
}
export {usePostDataWithDifferentFormat,usePostData};