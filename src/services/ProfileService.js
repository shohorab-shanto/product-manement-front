import http from "../http-common";


const getProfile = async()=>{
  const res = await http.get("/profile");
  
  return res.data;
}

const changePassword = async (data) => {
  const res = http.post("/password-update", data);

  return res.data;
};

const updateProfile = async (data) => {
    const res = await http.post("/profile-update", data);
    return res.data;
};

const ProfileService = {
  getProfile,
  changePassword,
  updateProfile
};

export default ProfileService;
