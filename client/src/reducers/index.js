export default (state = {}, action) => {
    switch(action.type){
        case 'REMOVE_ITEM_RESULTS':
            return {
                ...state,
                itemResults: [],
                errorMsg: null
            };
        case 'SEARCH_PENDING':
        case 'LOOKUP_PENDING':
            return {
                ...state,
                loading: true,
                errorMsg: null
            };
        case 'SEARCH_FULFILLED':
        case 'LOOKUP_FULFILLED':
            return {
                ...state,
                itemResults: action.payload,
                loading: false
            };
        case 'SEARCH_REJECTED':
        case 'LOOKUP_REJECTED':
            return {
                ...state,
                loading: false,
                errorMsg: 'Error fetching data - ' + action.payload,
                itemResults: []
            };
        case 'SEARCH_BOX_CHANGED':
            return {
                ...state,
                searchBox: { ...state.searchBox, ...action.searchBox }
            };
        case 'LOOKUP_BOX_CHANGED':
            return {
                ...state,
                lookupBox: { ...state.lookupBox, ...action.lookupBox }
            };
        default:
            return state
    }
};
