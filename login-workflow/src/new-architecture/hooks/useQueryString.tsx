type SearchParams = {
    [key: string]: string;
};
/**
 * Hook that returns an object of query string parameters and values.
 *
 * @return an object whose keys/values are search param keys/values from the URL
 *
 * @category Hook
 */
export const useQueryString = (search: string): SearchParams => {
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
