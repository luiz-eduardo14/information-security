export type useFetchReturn<T, F> = [
    {
      data?: T;
      isLoading: boolean;
    },
    (filter: F) => void
  ];