import http from "../http-common";

const create = async (data) => {
  return http.post("/settings", data);
};

const getAll = async (data) => {
  const res = await http.get("/settings", {
      params: data
  });

  return res.data;
};

const getUsers = async ()=>{
  const res = await http.get("/get-user");
  return res.data;
  
}

const SettingsService = {
  create,
  getAll,
  getUsers
  };
  
  export default SettingsService;  