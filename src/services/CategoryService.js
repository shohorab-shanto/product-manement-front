import http from "../http-common";

const getAll = async () => {
    const res = await http.get("/categories");
    
    return res.data;
};

const get = async (id) => {
    const res = await http.get(`/categories/${id}`);
    return res.data;
};

const create = async (data) => {
    const res = await http.post("/categories",data)
    return res.data;
};

const update = async (id, data) => {
    const res = await http.put(`/categories/${id}`, data);
    return res.data;
};

const remove = async (id) => {
    const res = await http.delete(`/categories/${id}`);
    return res.data;
};

const CategoryService = {
    getAll,
    get,
    create,
    update,
    remove,
  };

export default CategoryService