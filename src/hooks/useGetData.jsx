import axios from "axios";
import baseURL from "../API/baseURL";
const useGetData=async (url,params)=>{
    const res= await baseURL.get(url,params)
    return res.data;
}

const useGetDataWithToken=async (url,params)=>{
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res= await baseURL.get(url,config)
    return res.data;
}
export { useGetData,useGetDataWithToken}