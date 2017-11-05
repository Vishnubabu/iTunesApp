import jquery from 'jquery';

const apiRoot = '/api/';

const onResponse = res => {
    if (res.status === 200) {
        return res.json();
    }

    return Promise.reject('ERR: ' + res.status);
};

export const search = params => fetch(apiRoot + 'search?' + jquery.param(params)).then(onResponse);

export const lookup = params => fetch(apiRoot + 'lookup?' + jquery.param(params)).then(onResponse);
