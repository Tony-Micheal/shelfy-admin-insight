
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRolesAction, deleteRoleAction } from '@/redux/actions/RolesAction';
import { useToast } from '@/hooks/use-toast';

const AllRolesHook = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  // Local state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Get data from redux
  const { allRoles, loading } = useSelector(state => state.RolesReducer);
  const roles = allRoles?.data?.roles || [];
  const pagination = allRoles?.data?.pagination || {};
  const totalPages = pagination.total_pages || 1;

  // Initial load
  useEffect(() => {
    fetchRoles(currentPage, itemsPerPage, searchTerm);
  }, [currentPage, itemsPerPage]);

  // Search with debounce
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchRoles(1, itemsPerPage, term);
      setCurrentPage(1);
    }, 500);

    setSearchTimeout(timeout);
  };

  // Fetch roles
  const fetchRoles = (page, limit, search) => {
    dispatch(getAllRolesAction(page, limit, search));
  };

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Delete role
  const handleDeleteRole = (roleId) => {
    dispatch(deleteRoleAction(roleId))
      .then(() => {
        // Refresh the roles list
        fetchRoles(currentPage, itemsPerPage, searchTerm);
        
        toast({
          title: "Success",
          description: "Role has been deleted successfully",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete role",
        });
      });
  };

  return [
    roles,
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
