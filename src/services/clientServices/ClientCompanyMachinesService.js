import ClientCompanyMachines from "pages/client/client-machines";
import http from "../../http-common";

const getAll = async (data) => {
  const res = await http.get(`/client-company-machines`, {
    params: data
});
  return res.data;
};

const ClientCompanyMachinesService = {
    getAll
  };
  
  export default ClientCompanyMachinesService;