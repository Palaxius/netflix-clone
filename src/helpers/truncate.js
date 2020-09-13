export const truncate = (str, n) => {
  return str?.length > n ? str.substring(0, n-1) + '...' : str;
}