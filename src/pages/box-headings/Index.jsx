import Confirmation from "components/utils/Confirmation";
import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoxHeadingService from "services/BoxHeadingService";
import CreateBoxHeading from "./Create";
import EditBoxHeading from "./Edit";

const BoxHeadings = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({})

  const [boxHeadins, setBoxHeadins] = useState([]);
  const [boxId, setBoxId] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getBoxHeadings = async () => {
    const res = await BoxHeadingService.getAll(filter)
    setBoxHeadins(res)
    setLoading(false);
  };

  const filterData = (dt) => {
    setFilter({
      ...filter,
      ...dt,
    });
  };

  const deleteBoxHeading = async (id) => {
    await BoxHeadingService.remove(id);
    getBoxHeadings();
  };

  useEffect(() => {
    getBoxHeadings();
  }, [filter]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "60%",
      wrap: true,
      field: "name",
      format: (row) => (
        <div className="d-flex align-items-center">          
          <div className="d-flex justify-content-start flex-column">
            <Link
              to={"/panel/box-headings/" + row.id}
              className="text-dark fw-bolder text-hover-primary"
            >
              {row.name}
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "Parts",
      width: "20%",
      selector: (row) => row.parts_count,
      sortable: true,
      field: "machine",
    },

    {
      name: "Action",
      selector: (row) => row.status,
      mwidth: "20%",
      format: (row) => (
        <span className="text-end">
          <PermissionAbility permission="parts_show">
            <Link
              to={"/panel/box-headings/" + row.id}
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </PermissionAbility>

          <PermissionAbility permission="parts_edit">
            <button
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              onClick={() => {
                setUpdateOpen(true);
                setBoxId(row.id);
              }}
            >
              <i className="fa fa-pen"></i>
            </button>
          </PermissionAbility>

          <PermissionAbility permission="parts_delete">
            <Link
              to="#"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
              onClick={() => {
                setBoxId(row.id);
                setConfirmDelete(true);
              }}
            >
              <i className="fa fa-trash"></i>
            </Link>
          </PermissionAbility>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" className="container-xxl">
          <div className="card mb-5 mb-xl-8">          

            <div className="post d-flex flex-column-fluid">
              <div className="container-xxl">
                <Table
                  name="box_headings"
                  buttonName="Add New Box"
                  onClickButton={() => setOpen(true)}
                  isLoading={loading}
                  data={boxHeadins}
                  columns={columns}
                  onFilter={filterData}
                  
                />
              </div>
            </div>

            {/* <div className="card-body py-3">
              <div className="table-responsive">
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <thead>
                    <tr className="fw-bolder text-muted">
                      <th className="w-25px"></th>
                      <th className="min-w-120px">Name</th>
                      <th className="min-w-120px">Parts</th>
                      <th className="min-w-100px text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td>
                          <i className="fas fa-cog fa-spin"></i>
                          Loading...
                        </td>
                      </tr>
                    ) : null}

                    {boxHeadins?.map((item, index) => (
                      <tr key={index}>
                        <td></td>

                        <td>
                          <Link
                            to={"/panel/box-headings/" + item.id}
                            className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                          >
                            {item.name}
                          </Link>
                        </td>

                        <td>{item.parts_count}</td>

                        <td className="text-end">
                          <PermissionAbility permission="box-headings_show">
                            <Link
                              to={"/panel/box-headings/" + item.id}
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                          </PermissionAbility>
                          <PermissionAbility permission="box-headings_edit">
                            <Link
                              to="#"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              onClick={() => {
                                setUpdateOpen(true);
                                setBoxId(item.id);
                              }}
                            >
                              <i className="fa fa-pen"></i>
                            </Link>
                          </PermissionAbility>
                          <PermissionAbility permission="box-headings_delete">
                            <Link
                              to="#"
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                              onClick={() => {
                                setBoxId(item.id);
                                setConfirmDelete(true);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          </PermissionAbility>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <CreateBoxHeading
        open={open}
        onCloseModal={() => setOpen(false)}
        onChange={() => {
          getBoxHeadings();
        }}
      />

      <EditBoxHeading
        open={updateOpen}
        onCloseModal={() => setUpdateOpen(false)}
        onChange={() => {
          getBoxHeadings();
        }}
        boxId={boxId}
      />

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteBoxHeading(boxId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
};

export default BoxHeadings;
