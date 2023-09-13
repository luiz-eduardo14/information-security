import usePrevious from './usePrevious';

export default (val: any) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};