import { search, lookup } from '../services/ApiService';

export const doSearch = params => {
    return {
        type: 'SEARCH',
        payload: search(params)
    };
}

export const doLookup = params => {
    return {
        type: 'LOOKUP',
        payload: lookup(params)
    };
}

export const removeItemResults = () => {
    return {
        type: 'REMOVE_ITEM_RESULTS'
    };
}

export const searchBoxChanged = searchBox => {
    return {
        type: 'SEARCH_BOX_CHANGED',
        searchBox
    };
}

export const lookupBoxChanged = lookupBox => {
    return {
        type: 'LOOKUP_BOX_CHANGED',
        lookupBox
    };
}
