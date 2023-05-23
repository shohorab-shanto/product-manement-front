import http from "../../http-common";

const getAll = async (data) => {
  const res = await http.get(`/client-requisitions`, {
    params: data,
  });
  return res.data;
};

const get = async (id) => {
  const res = await http.get(`/client-requisitions/${id}`);
  return res.data;
};

const create = async (data) => {
  const res = await http.post(`/client-requisitions`, data);
  return res.data;
};

const createrequiredrequisitions = async (data) => {
  const res = await http.post(`required-part/requisitions`, data);
  return res.data;
};

//file upload
const fileUpload = async (id, data) => {
  console.log("shanto", data);
  const res = await http.post(`/client-requisitions/${id}/files`, data);
  return res.data;
};

//get file
const getFile = async (id) => {
  const res = await http.get(`/client-requisitions/${id}/files`);
  return res.data;
};

//get file
const deleteFile = async (uuid, model_id) => {
  const res = await http.delete(
    `/client-requisitions/${model_id}/files/${uuid}/delete`
  );
  return res.data;
};

const ClientRequisitionService = {
  getAll,
  createrequiredrequisitions,
  get,
  create,
  fileUpload,
  getFile,
  deleteFile,
};

export default ClientRequisitionService;
