import { CREATE_SEGMENT, DELETE_SEGMENT, GET_ALL_SEGMENTS, GET_SEGMENT_DETAILS, UPDATE_SEGMENT } from "../type";


const initial = {
    allSegments: [],
    SegmentDetails:[],
    updateSegment:[],
    createSegment:[],
    deleteSegment:[],
    loading: true,
};

export const SegmentsReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_SEGMENTS:
            return {
                ...state,
                allSegments: action.payload,
                loading: false
            }
        case GET_SEGMENT_DETAILS:
            return {
                ...state,
                SegmentDetails: action.payload,
                loading: false
            }
        case UPDATE_SEGMENT:
            return {
                ...state,
                updateSegment: action.payload,
                loading: false
            }
        case DELETE_SEGMENT:
            return {
                ...state,
                deleteSegment: action.payload,
                loading: false
            }
        case CREATE_SEGMENT:
            return {
                ...state,
                createSegment: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

