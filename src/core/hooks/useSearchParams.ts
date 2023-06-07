const useSearchParams = () => {
  const searchedParam = (name: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(name);
    return paramValue;
  };

  return { searchedParam };
};

export default useSearchParams;
