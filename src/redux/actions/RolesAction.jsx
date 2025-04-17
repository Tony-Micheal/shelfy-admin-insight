
import { useGetDataWithToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/usePatchData";
import { usePostData } from "../../hooks/usePostData";
import useDeleteData from "../../hooks/useDeleteData";
import { GET_ALL_ROLES, SHOW_ROLE, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE } from './../type';

const getAllRolesAction = (page, limit, searchTerm = '') => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/Roles?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
    dispatch({
      type: GET_ALL_ROLES,
      payload: response,
      loading: true
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_ROLES,
      payload: e.response
    });
  }
};

const getRoleDetailsAction = (id) => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/roles/show?id=${id}`);
    dispatch({
      type: SHOW_ROLE,
      payload: response,
      loading: true
    });
  } catch (e) {
    dispatch({
      type: SHOW_ROLE,
      payload: e.response
    });
  }
};

const createRoleAction = (data) => async (dispatch) => {
  try {
    const response = await usePostData(`/roles/store`, data);
    dispatch({
      type: CREATE_ROLE,
      payload: response,
      loading: true
    });
  } catch (e) {
    dispatch({
      type: CREATE_ROLE,
      payload: e.response
    });
  }
};

const updateRoleAction = (data) => async (dispatch) => {
  try {
    const response = await usePatchData(`/roles/update`, data);
    dispatch({
      type: UPDATE_ROLE,
      payload: response,
      loading: true
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ROLE,
      payload: e.response
    });
  }
};

const deleteRoleAction = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/roles/delete?role=${id}`);
    dispatch({
      type: DELETE_ROLE,
      payload: response,
      loading: true
    });
  } catch (e) {
    dispatch({
      type: DELETE_ROLE,
      payload: e.response
    });
  }
};

export { getAllRolesAction, getRoleDetailsAction, createRoleAction, updateRoleAction, deleteRoleAction };
