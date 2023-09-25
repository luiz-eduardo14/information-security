import { ApiResponse, create } from 'apisauce';
import { Storage } from '../utils';
import { AxiosRequestConfig } from 'axios';
import { Toast } from '../utils/Toast';

const url = import.meta.env.VITE_API_URL || '';

const api = create({
  baseURL: `${url}/api/`,
  timeout: 30000,
});

export function setHeaderRequest(request: AxiosRequestConfig) {
  const token = localStorage.getItem(Storage.TOKEN);
  if (token && request?.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
}

const generateResponseTransform = () => async (response: ApiResponse<any>) => {
  if (!response.ok) {
    if (response.status === 401) {
        Toast.showErrorMessage(
        response?.data?.error ||
          'É necessário estar autenticado para utilizar esse serviço.'
      );
      if (window.location.pathname !== '/signin') (window.location as any) = '/logout';
    } else {
      // try {
      //   const blobResponse = JSON.parse(
      //     (await response?.data?.text?.()) || '{}'
      //   );
      //   Toast.showErrorMessage(
      //     translateRequestErrorResponse(
      //       response?.data?.detail ||
      //         response?.data?.title ||
      //         response?.data?.error ||
      //         blobResponse?.error ||
      //         blobResponse?.message ||
      //         blobResponse?.title ||
      //         'Erro interno no servidor.'
      //     )
      //   );
      // } catch (e) {
      //   Toast.showErrorMessage('Erro interno no servidor.');
      // }
    }
  }
  return null;
};

api.addResponseTransform(generateResponseTransform());

api.addRequestTransform(setHeaderRequest);

export default api;