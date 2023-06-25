import http from "../http-common";

const getAll = async () => {
    const res = await http.get("/product");
    
    return res.data;
};

const get = async (id) => {
    const res = await http.get(`/product/${id}`);
    return res.data;
};

const create = async (data) => {
    const res = await http.post("/product",data)
    return res.data;
};

const update = async (id, data) => {
    const res = await http.put(`/product/${id}`, data);
    return res.data;
};

const remove = async (id) => {
    const res = await http.delete(`/product/${id}`);
    return res.data;
};

const ProductService = {
    getAll,
    get,
    create,
    update,
    remove,
  };

export default ProductService