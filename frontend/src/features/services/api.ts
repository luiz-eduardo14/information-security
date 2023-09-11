const baseUrl = import.meta.env.VITE_API_URL;

function fetchApi(fetchInfo: RequestInfo): Promise<Response> {
    return fetch(fetchInfo instanceof String ? baseUrl + fetchInfo : {
        ...(fetchInfo as Request),
        url: baseUrl + (fetchInfo as Request).url
    });
}