import axios from "axios";
import baseURL from "../API/baseURL";
const useDeleteData=async (url,params)=>{
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseURL.delete(url,config);
    return res;
}
export default useDeleteData;