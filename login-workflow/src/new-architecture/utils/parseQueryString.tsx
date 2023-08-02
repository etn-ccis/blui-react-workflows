type SearchParams = {
    [key: string]: string;
};

export const parseQueryString = (search: string): SearchParams => {
    let noQuestion = search;
    if (noQuestion.startsWith('?')) noQuestion = noQuestion.substr(1);

    const params = noQuestion.split('&');
    const ret: SearchParams = {};

    params.forEach((param) => {
        const keyVal = param.split('=', 2);
        if (keyVal.length > 1) {
            ret[keyVal[0]] = decodeURI(keyVal[1]);
        }
    });
    return ret;
};
