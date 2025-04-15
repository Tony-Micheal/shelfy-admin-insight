
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminsAction } from '../../../redux/actions/AdminsAction';

// Mock data for development until API is ready
const mockAdmins = [
  { id: 1, name: 'John Admin', email: 'john@admin.com', phone: '555-123-4567', role: 'Super Admin' },
  { id: 2, name: 'Sarah Manager', email: 'sarah@admin.com', phone: '555-987-6543', role: 'Manager' },
  { id: 3, name: 'David Support', email: 'david@admin.com', phone: '555-456-7890', role: 'Support' },
  { id: 4, name: 'Lisa Analyst', email: 'lisa@admin.com', phone: '555-789-0123', role: 'Analyst' },
  { id: 5, name: 'Mark Editor', email: 'mark@admin.com', phone: '555-321-6547', role: 'Editor' },
];

const AllAdminsHook = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getData = async (page = 1) => {
        setLoading(true);
        await dispatch(getAllAdminsAction(page, 10));
        setLoading(false);
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    // Uncomment this when API is ready and adjust reducer
    // const { allAdmins } = useSelector(state => state.AdminsReducer);
    
    // Using mock data for development
    let allAdmins = mockAdmins; 
    let totalPages = 2; // Mock total pages

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return [allAdmins, totalPages, currentPage, handlePreviousPage, handleNextPage, loading];
};

export default AllAdminsHook;
