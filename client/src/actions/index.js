import { search, lookup } from '../services/ApiService';

export const doSearch = params => ({
    type: 'SEARCH',
    payload: search(params)
});

export const doLookup = params => ({
    type: 'LOOKUP',
    payload: lookup(params)
});

export const removeItemResults = () => ({
    type: 'REMOVE_ITEM_RESULTS'
});

export const searchBoxChanged = searchBox => ({
    type: 'SEARCH_BOX_CHANGED',
    searchBox
});

export const lookupBoxChanged = lookupBox => ({
    type: 'LOOKUP_BOX_CHANGED',
    lookupBox
});
