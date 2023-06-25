import http from "../http-common";

const getAll = async () => {
    const res = await http.get("/attributes");
    
    return res.data;
};

const get = async (id) => {
    const res = await http.get(`/attributes/${id}`);
    return res.data;
};

const create = async (data) => {
    const res = await http.post("/attributes",data)
    return res.data;
};

const update = async (id, data) => {
    const res = await http.put(`/attributes/${id}`, data);
    return res.data;
};

const remove = async (id) => {
    const res = await http.delete(`/attributes/${id}`);
    return res.data;
};

const AttributeService = {
    getAll,
    get,
    create,
    update,
    remove,
  };

export default AttributeService