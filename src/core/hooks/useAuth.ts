const useAuth = () => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);

  return {
    isAuth: !!token,
  };
};

export default useAuth;
