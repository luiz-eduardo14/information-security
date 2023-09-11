const baseUrl = import.meta.env.VITE_API_URL;

export function fetchApi(fetchInfo: Partial<RequestInfo>): Promise<Response> {    
    return fetch(fetchInfo instanceof String ? baseUrl + fetchInfo : {
        ...(fetchInfo as Request),
        url: baseUrl + (fetchInfo as Request).url
    });
}