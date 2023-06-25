import http from "../http-common";

const getAll = async () => {
    const res = await http.get("/attribute-value");
    
    return res.data;
};

const get = async (id) => {
    const res = await http.get(`/attribute-value/${id}`);
    return res.data;
};

const getAttributeValue = async (id) => {
    const res = await http.get(`/get-attribute-value/${id}`);
    return res.data;
};

const create = async (data) => {
    const res = await http.post("/attribute-value",data)
    return res.data;
};

const update = async (id, data) => {
    const res = await http.put(`/attribute-value/${id}`, data);
    return res.data;
};

const remove = async (id) => {
    const res = await http.delete(`/attribute-value/${id}`);
    return res.data;
};

const attributesValueService = {
    getAll,
    get,
    getAttributeValue,
    create,
    update,
    remove,
  };

export default attributesValueService