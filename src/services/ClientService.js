import http from "../http-common";


const get = async (id) => {
    const res = await http.get(`/clientmachines/${id}`);
    return res.data;
};
const getContract = async (id) => {
    const res = await http.get(`/clientcontracts/${id}`);
    return res.data;
};

const getMachine = async(id)=>{
    const res = await http.get(`/getmachines/${id}`);
    return res.data;
}

const ClientService = {
   
    get,
    getContract,
    getMachine
   
  };

export default ClientService