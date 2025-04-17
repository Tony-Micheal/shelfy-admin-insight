
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategoryAction } from '../../../redux/actions/CategoriesAction';

export default function CreateCategoryHook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // States
    const [title, setTitle] = useState('');
    const [titleAr, setTitleAr] = useState('');
    const [points, setPoints] = useState("");
    const [cate, setCate] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // Methods 
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeTitleAr = (e) => {
        setTitleAr(e.target.value);
    }

    const onChangePoints = (e) => {
        setPoints(e.target.value);
    }

    const onChangeCate = (e) => {
        setCate(e.target.value);
    }

    const onChangeImage = (e) => {
        setImage(e.target.files[0]); // Store the file object instead of value
    }

    // Form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // Create form data for proper file upload
            const formData = new FormData();
            formData.append('title', title);
            formData.append('name_ar', titleAr);
            formData.append('points', points);
            
            if (cate && cate !== "none") {
                formData.append('parent_id', cate);
            }
            
            if (image) {
                formData.append('image', image);
            }
            
            // Dispatch action with form data
            const response = await dispatch(createCategoryAction(formData));
            console.log('Category creation response:', response);
            
            if (response && response.status === 200) {
                setIsSubmitted(true);
                setTimeout(() => {
                    navigate("/categories");
                }, 1000);
            } else {
                setError("Failed to create category. Please check your inputs.");
            }
        } catch (err) {
            console.error('Error creating category:', err);
            setError("An error occurred while creating the category.");
        } finally {
            setLoading(false);
        }
    }

    // Get response from Redux
    const creationResponse = useSelector(state => state.CategoriesReducer.createCate);

    // Handle response effect
    useEffect(() => {
        if (isSubmitted && !loading) {
            if (creationResponse && creationResponse.status === 200) {
                navigate("/categories");
            }
        }
    }, [isSubmitted, loading, creationResponse, navigate]);

    return [title, titleAr, points, cate, image, onChangeTitle, onChangeTitleAr, onChangePoints, onChangeCate, onChangeImage, onSubmit, loading, error];
}
