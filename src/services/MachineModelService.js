import http from "../http-common";

const getAll = async (machineId) => {
    const res = await http.get(`/machines/${machineId}/models`);
    
    return res.data;
};

const get = async (machineId, id) => {
    const res = await http.get(`/machines/${machineId}/models/${id}`);
    return res.data;
};

const create = async (machineId, data) => {
    const res = await http.post(`/machines/${machineId}/models`,data)
    return res.data;
};

const update = async (machineId, id, data) => {
    const res = await http.put(`/machines/${machineId}/models/${id}`, data);
    return res.data;
};

const remove = async (machineId, id) => {
    const res = await http.delete(`/machines/${machineId}/models/${id}`);
    return res.data;
};

const MachineModelService = {
    getAll,
    get,
    create,
    update,
    remove,
  };

export default MachineModelService