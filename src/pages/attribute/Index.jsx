import PermissionAbility from "helpers/PermissionAbility";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AttributeService from "../../services/AttributeService";
import CreateAttribute from "./Create";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [attributes, setAttributes] = useState([]);
  console.log("🚀 ~ file: Index.jsx:10 ~ Index ~ attributes:", attributes)
  const [CategoryId, setCategoryId] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenUpdateModal = () => setUpdateOpen(true);
  const onCloseUpdateModal = () => setUpdateOpen(false);

  const getAttribute = async () => {
    setAttributes(await AttributeService.getAll());
  };

  const deleteAttribute = async (id) => {
    if (!window.confirm("Are you want to do it?")) return false;

    await AttributeService.remove(id);
    getAttribute();
  };

  useEffect(() => {
    getAttribute();
  }, []);
  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  Attributes
                </span>
              </h3>
              <div className="card-toolbar">
                <button
                  className="btn btn-light-primary btn-md"
                  onClick={() => {
                    onOpenModal();
                  }}
                >
                  Add Attribute
                </button>
              </div>
            </div>

            <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <thead>
                    <tr className="fw-bolder text-muted">
                      <th className="w-25px"></th>


                      <th className="min-w-120px">Attribute Name</th>
                      <th className="min-w-100px text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attributes?.map((item, index) => (
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

                        <td className="text-end">
                          <Link
                            to="#"
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            onClick={() => deleteAttribute(item.id)}
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

      <CreateAttribute
        open={open}
        onCloseModal={onCloseModal}
        getAttribute={ getAttribute}
      />
    </>
  );
};

export default Index;
