import http from "../../http-common";

const getAll = async (data) => {
  const res = await http.get(`/client-delivery-notes`, { 
    params: data
});
  return res.data;
};

const create = async (data) => {
  const res = await http.post(`/client-delivery-notes`, data) 
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/client-delivery-notes/${id}`);
  return res.data;
};

const ClientDeliverNoteService = { 
    getAll,
    create,
    get
  };
  
  export default ClientDeliverNoteService;