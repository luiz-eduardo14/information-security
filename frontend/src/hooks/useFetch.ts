/* eslint-disable no-unused-vars */
import { ApiErrorResponse, ApiOkResponse, ApiResponse } from 'apisauce';
import { useEffect, useReducer, useRef } from 'react';
import { useFetchReturn } from './types/useFetch';
import useCompare from './useCompare';

const initialState = {
  isLoading: false,
  filter: {},
  data: null,
  totalItems: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        totalItems: action.payload.totalItems,
      };
    case 'FILTER':
      return {
        ...initialState,
        filter: action.payload.filter,
        data: action.payload.initialData,
        totalItems: action.payload.totalItems,
      };
    default:
      throw new Error();
  }
};

export default <T, F>(
  provider: (param: any, filter: F) => Promise<ApiResponse<T>>,
  param: any,
  requestOnMount: boolean,
  initialData: T | null,
  errorHandler?:
    | ((
        error: ApiErrorResponse<{
          status?: number;
          title?: string;
        }>
      ) => void)
    | null,
  successCallback?: ((response: ApiOkResponse<T>) => void) | null
): useFetchReturn<T, F> => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    data: initialData,
  });
  const diff = useCompare(param);
  const diffProvider = useCompare(provider);
  const shouldLoad = useRef(requestOnMount);

  const { filter } = state;

  useEffect(() => {
    if (diff || diffProvider) {
      dispatch({ type: 'FETCH_SUCCESS', payload: { data: initialData } });
    } else if (shouldLoad.current) {
      dispatch({ type: 'FETCH_INIT' });
      provider(param, filter)
        .then(result => {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              data: result.ok ? result?.data : initialData,
              totalItems: result.headers
                ? +result.headers['x-total-count']
                : null,
            },
          });
          shouldLoad.current = false;
          if (result.ok) {
            successCallback && successCallback(result);
          } else if (!result.ok) {
            errorHandler && errorHandler(result as any);
          }
        })
        .catch(err => errorHandler && errorHandler(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff, diffProvider, filter, provider, shouldLoad.current]);

  function fetchFilter(payload: F | string | number) {
    shouldLoad.current = true;
    dispatch({
      type: 'FILTER',
      payload: {
        filter:
          typeof payload === 'string' || typeof payload === 'number'
            ? payload
            : { ...payload },
        initialData,
      },
    });
  }

  return [state, fetchFilter];
};