import PermissionAbility from "helpers/PermissionAbility";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import CreateWareHouse from "./Create";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  console.log("🚀 ~ file: Index.jsx:10 ~ Index ~ categories:", categories)
  const [CategoryId, setCategoryId] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenUpdateModal = () => setUpdateOpen(true);
  const onCloseUpdateModal = () => setUpdateOpen(false);

  const getCategory = async () => {
    setCategories(await CategoryService.getAll());
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you want to do it?")) return false;

    await CategoryService.remove(id);
    getCategory();
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  Warehouses
                </span>
              </h3>
              <div className="card-toolbar">
                <button
                  className="btn btn-light-primary btn-md"
                  onClick={() => {
                    onOpenModal();
                  }}
                >
                  Add Category
                </button>
              </div>
            </div>

            <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <thead>
                    <tr className="fw-bolder text-muted">
                      <th className="w-25px"></th>


                      <th className="min-w-120px">Name</th>
                      <th className="min-w-120px">Parent</th>
                      <th className="min-w-100px text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories?.map((item, index) => (
                      <tr key={index}>
                        <td></td>


                        <td>
                          <Link
                            to={"#"}
                            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                          >
                            {item.name}
                          </Link>
                        </td>

                        <td>{item.parent_category_name}</td>

                        <td className="text-end">
                          <Link
                            to="#"
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            onClick={() => deleteCategory(item.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateWareHouse
        open={open}
        onCloseModal={onCloseModal}
        getCategory={ getCategory}
      />
    </>
  );
};

export default Index;
