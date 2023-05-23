import Confirmation from "components/utils/Confirmation";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/utils/Modal";
import DesignationService from "../../services/DesignationService";
import CreateDesignation from "./Create";
import PermissionAbility from "helpers/PermissionAbility";
const Index = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [designationId, setDesignationId] = useState("");
  const [designation, setDesignation] = useState("");

  const [data, setData] = useState({ name: "", description: "" });

  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const onOpenNewModal = () => setOpenModal(true);
  const onCloseNewModal = () => setOpenModal(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const getDesignations = async () => {
    setDesignations(await DesignationService.getAll());
  };

  const getDesignation = async () => {
    setDesignation(await DesignationService.get(designationId));
  };

  const updateDesignation = async () => {
    await DesignationService.update(designationId, data);
  };

  // change data
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    let tempdata = { ...data };
    tempdata[name] = value;

    setData(tempdata);
  };
  //update designation
  const onSubmit = () => {
    updateDesignation();
    onCloseModal();
  };

  //delete Designation
  const deleteDesignation = async (id) => {
    await DesignationService.remove(id);
    getDesignations();
    setOpen(false);
  };

  useEffect(() => {
    getDesignations();
  }, []);

  useEffect(() => {
    if (designationId) {
      getDesignation();
    }
  }, [designationId]);

  useEffect(() => {
    let tempdata = { ...data };
    tempdata.name = designation.name;
    tempdata.description = designation.description;
    setData(tempdata);
  }, [designation]);

  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  Designations
                </span>
              </h3>

              <div className="card-toolbar">
                <button
                  className="btn btn-light-primary btn-md"
                  onClick={() => {
                    onOpenNewModal();
                  }}
                >
                  Add Designation
                </button>
              </div>
            </div>
            <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <thead>
                    <tr className="fw-bolder text-muted">
                      <th className="min-w-150px">Designation</th>
                      <th className="min-w-150px">Members</th>
                      <th className="min-w-100px text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {designations?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link
                            to={"/panel/designations/" + item.id}
                            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>
                          {item.members}
                        </td>

                        <td className="text-end">
                          <PermissionAbility permission="designations_show">
                            <Link
                              to={"/panel/designations/" + item.id}
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                          </PermissionAbility>

                          <PermissionAbility permission="designations_edit">
                            <button
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              onClick={() => {
                                onOpenModal();
                                setDesignationId(item.id);
                              }}
                            >
                              <i className="fa fa-pen"></i>
                            </button>
                          </PermissionAbility>

                          <PermissionAbility permission="designations_delete">
                            <button
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                              onClick={() => {
                                setDesignationId(item.id);
                                setConfirmDelete(true);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </PermissionAbility>
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
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Designation</>}
        id={designationId}
        body={
          <>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Designation Name"
                  name="name"
                  id="name"
                  value={data.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-5">
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Designation Description"
                  name="description"
                  id="description"
                  value={data.description || ""}
                  onChange={handleChange}
                />
              </div>

              <button
                type="reset"
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={onSubmit}
              >
                Update
              </button>
              <button
                type="reset"
                className="btn btn-secondary  mt-5 "
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </form>
          </>
        }
      />

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteDesignation(designationId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />

      <CreateDesignation
        open={openModal}
        onCloseModal={onCloseNewModal}
        getDesignations={getDesignations}
      />
    </>
  );
};

export default Index;
