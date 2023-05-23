import http from "../http-common";

const getAll = async (data) => {
  const res = await http.get(`/gate-pass`, {
    params: data
});
  return res;
};

const GatePassService = {
    getAll
  };
  
  export default GatePassService;