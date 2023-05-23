import http from "../http-common";



const login = async(email,password)=>{
    const res = await http.post("/login", {email,password});
    if (res.data.access_token){
      localStorage.setItem("user",JSON.stringify(res.data));
    }
    return res.data;
}

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
