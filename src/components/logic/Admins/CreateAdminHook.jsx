
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminAction } from '../../../redux/actions/AdminsAction';

const CreateAdminHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email,setEmail ] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [pass, setPass] = useState("");


  const onChangeName=(e)=>{
    setName(e.target.value);
  }

  const onChangeEmail=(e)=>{
    setEmail(e.target.value);
  }
  
  const onChangePhone=(e)=>{
    setPhone(e.target.value);
  }

  const onChangeRole=(e)=>{
    setRole(e.target.value);
  }

  const onChangePass=(e)=>{
    setPass(e.target.value);
  }

 //authReducer
const onSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true)
    await Dispatch(createAdminAction({
        name:name,
        email:email,
        phone:phone,
        role_id:id,
        password:"12345678"

    }))
    setLoading(false)

}

  const res = useSelector(state => state.AdminsReducer.allAdmins);
  



  return [
    allAdmins, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    searchTerm, 
    handleSearch, 
    loading
  ];
};

export default CreateAdminHook;
