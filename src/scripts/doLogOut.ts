type SetLoggedInType = (value: string) => void;

const doLogOut = (setLoggedIn: SetLoggedInType) => {
  try {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    setLoggedIn("");
  } catch (error) {
    console.error("Помилка при виході:", error);
  }
};

export default doLogOut;
