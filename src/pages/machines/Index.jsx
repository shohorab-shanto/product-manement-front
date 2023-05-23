import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confirmation from "../../components/utils/Confirmation";
import MachineService from "../../services/MachineService";
import CreateMachine from "./Create";
import EditMachine from "./Edit";

const Machines = () => {
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [machines, setMachines] = useState([]);
  const [machineId, setMachineId] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);

  const onCloseModal = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const getMachines = async (filters) => {
    setMachines(await MachineService.getAll(filters));
    setLoading(false);
  };

  const deleteMachine = async () => {
    await MachineService.remove(machineId);
    getMachines();
  };


  const columns = [
    {
      name: "Name",
      width: "30%",
      selector: (row) => row?.name,
      sortable: true,
      field: "name",
      format: row => (
        <div className="d-flex align-items-center">
        
          <div className="d-flex justify-content-start flex-column">
            <Link
              to={"/panel/machines/" + row.id}
              className="text-dark fw-bolder text-hover-primary" 
            >
              {row.name}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: "Models",
      width: "50%",
      selector: (row) =>
      row?.models_count,
      sortable: true,
      field: "models",
    },
    {
      name: "Action",
      selector: (row) => row.status,
      maxWidth: "150px",
      format: (row) => (
        <span className="text-end">
          <PermissionAbility permission="machines_show">
            <Link
              to={"/panel/machines/" + row.id}
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </PermissionAbility>
          <PermissionAbility permission="machines_edit">
            <button
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              onClick={() => {
                setUpdateOpen(true);
                setMachineId(row.id);
              }}
            >
              <i className="fa fa-pen"></i>
            </button>
          </PermissionAbility>

          <PermissionAbility permission="machines_delete">
            <Link
              to="#"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
              onClick={() => {
                setMachineId(row.id);
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

  useEffect(() => {
    getMachines();
  }, []);
  return (
    <>
      <div className="post d-flex flex-column-fluid" id="kt_post">
      <div className="container-xxl">
      <Table
            name="Machines"
            buttonName="Add Machine"
            onClickButton={() => setOpen(true)}
            buttonPermission="parts_create"
            
            // callbackButtons={[
            //   // {
            //   //   name: 'Filter',
            //   //   // callback: () => { setEnableFilter(!enableFilter) },
            //   //   permission: null
            //   // },
            //   // {
            //   //   name: 'Import',
            //   //   // callback: () => { setOpenImportModal(true) },
            //   //   permission: null
            //   // }
            // ]}
            isLoading={loading} data={machines}
            columns={columns}
            
            onFilter={getMachines}
          />
       
        </div>
      </div>

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteMachine(machineId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />

      <CreateMachine
        open={open}
        onCloseModal={onCloseModal}
        getMachines={getMachines}
      />

      <EditMachine
        open={updateOpen}
        onCloseModal={onCloseModal}
        getMachines={getMachines}
        machineId={machineId}
      />
    </>
  );
};

export default Machines;
