
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRolesAction, deleteRoleAction } from '../../../redux/actions/RolesAction';

const AllRolesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const getData = async (page = 1, search = '') => {
    setLoading(true);
    try {
      await dispatch(getAllRolesAction(page, 10, search));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(1);
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    await getData(1, term);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await getData(page, searchTerm);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await dispatch(deleteRoleAction(roleId));
      // Refresh the roles list after deletion
      getData(currentPage, searchTerm);
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const res = useSelector(state => state.RolesReducer?.allRoles);
  
  let allRoles = [];
  let totalPages = 0;

  try {
    if (res?.data) {
      allRoles = res.data;
      if (res.pagination) {
        totalPages = res.pagination.last_page || 0;
      }
    }
  } catch (e) {
    console.error('Error processing roles data:', e);
  }

  return [
    allRoles, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    searchTerm, 
    handleSearch, 
    loading, 
    handleDeleteRole
  ];
};

export default AllRolesHook;
