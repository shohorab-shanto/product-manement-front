import React, { useState, useEffect } from "react";
import Modal from "../../components/utils/Modal";
import EmployeeService from "../../services/EmployeeService";
import DesignationService from "../../services/DesignationService";
import RoleService from "services/RoleService";
import Select from "react-select";

const CreateEmployee = ({ open, onCloseModal, getEmployees }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    designation_id: null,
    role: null,
  });
  const [roles, setRoles] = useState([]);
  const [defaultRole, setDefaultRole] = useState(null);


  const setImage = async (e) => {
    let logoShow = document.getElementById("avatar");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  const handleSelect = (option, conf) => {
    const value = option.value;
    const name = conf.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const createEmployee = async (e) => {
    e.preventDefault()
    let formData = new FormData(document.getElementById("create-employee"));
    await EmployeeService.create(formData);
    getEmployees();
    onCloseModal();
  };
  const [designations, setDesignations] = useState([]);

  const getDesignations = async () => {
    setDesignations(await DesignationService.getAll());
  };

  const getRoles = async () => {
    let data = await RoleService.getAll();
    data = data.map((itm) => ({ label: itm.name, value: itm.id })); //Parse the data as per the select requires
    setRoles(data);
  };

  useEffect(() => {
    if (open) {
      getDesignations();
      getRoles();
    }
  }, [open]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (open) {
      setDefaultRole({ label: data.role, value: data.role_id });
    }
  }, [data.role]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Employee</>}
        body={
          <>
            <form id="create-employee">

              <div className="mb-10 fv-row fv-plugins-icon-container text-center">
                <div
                  className="mx-auto image-input image-input-outline image-input-changed"
                  data-kt-image-input="true"
                >
                  <div
                    className="image-input-wrapper w-125px h-125px"
                    style={{
                      backgroundImage:
                        "url(/assets/media/svg/files/blank-image.svg)",
                    }}
                    id="avatar"
                  ></div>
                  <label
                    className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    data-bs-original-title="Change avatar"
                  >
                    <i className="bi bi-pencil-fill fs-7"></i>
                    <input
                      type="file"
                      name="avatar"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => { setImage(e) }}
                      value={data.avatar ?? ''}
                    />
                  </label>
                </div>
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="avatar"></div>
              </div>
              <div className="form-group">
                <label className="required form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter  Name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={data.name ?? ''}
                />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="name"></div>
              </div>

              <div className="form-group mt-5">
                <label className="required form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={data.email ?? ''}
                />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="email"></div>
              </div>

              <div className="form-group mt-5">
                <label className="required form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={data.password ?? ''}
                />
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="password"></div>
              </div>

              <div className="form-group mt-5">
                <label className="required form-label">Designation</label>
                <select className="form-control" name="designation_id" id="designation_id" onChange={handleChange}>
                  <option value="">Select designation</option>
                  {designations?.map((item, index) => (
                    <option value={item?.id} key={index}>{item?.name}</option>
                  ))}
                </select>
                <div className="fv-plugins-message-container invalid-feedback" htmlFor="designation_id"></div>
              </div>

              <div className="form-group">
                <label className="required form-label">Role</label>
                <Select
                  options={roles}
                  onChange={handleSelect}
                  name="role"
                  maxMenuHeight={250} 
                  defaultValue={defaultRole ?? ""}
                />

                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="role"
                ></div>
              </div>

              <button
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={createEmployee}
              >
                Create
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
    </div>
  );
};

export default CreateEmployee;
