import http from "../http-common";

const getAll = async (id) => {
  const res = await http.get(`/parts/${id}/aliases`);
  return res.data;
};

const get = async (partId, aliasId) => {
  const res = await http.get(`/parts/${partId}/aliases/${aliasId}`);
  return res.data;
};

const create = async (id, data) => {
  const res = await http.post(`/parts/${id}/aliases`, data)
  return res.data;
};

const update = async (id, aliasId, data) => {
  const res = await http.put(`/parts/${id}/aliases/${aliasId}`, data);
  return res.data;
};

const remove = async (id, aliasId) => {
  const res = await http.delete(`/parts/${id}/aliases/${aliasId}`);
  return res.data;
};

const PartAliasService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PartAliasService;