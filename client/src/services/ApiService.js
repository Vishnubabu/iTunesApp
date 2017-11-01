import jquery from 'jquery';

const apiRoute = '/api/';

const onResponse = res => {
    if(res.status === 200){
        return res.json();
    }

    return Promise.reject('ERR: ' + res.status);
};

export const search = (params) => {
    return fetch(apiRoute + 'search?' + jquery.param(params)).then(onResponse);
};

export const lookup = (params) => {
    return fetch(apiRoute + 'lookup?' + jquery.param(params)).then(onResponse);
};
