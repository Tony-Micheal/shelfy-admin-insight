
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminsAction } from '../../../redux/actions/AdminsAction';

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

    const res = useSelector(state => state.AdminsReducer.allAdmins);
    
    let allAdmins = mockAdmins; // Using mock data for now
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
