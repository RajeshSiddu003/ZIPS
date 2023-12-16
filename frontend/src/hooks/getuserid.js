export const getUserIDName = () => {
  return {
    userId: window.localStorage.getItem("userId"),
    username: window.localStorage.getItem("username"),
  };
};
