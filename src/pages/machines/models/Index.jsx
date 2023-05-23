import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Confirmation from 'components/utils/Confirmation';
import MachineModelService from "services/MachineModelService";
import CreateMachineModel from "./Create";
import EditMachineModel from "./Edit";
import PermissionAbility from 'helpers/PermissionAbility';

const MachineModels = ({ tab, models, onChange }) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [modelId, setModelId] = useState(null);
  const [machineModels, setMachineModels] = useState([]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const onCloseModal = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const deleteModel = async () => {
    await MachineModelService.remove(id, modelId);
    onChange();
  };

  useEffect(() => {
    if (models)
      setLoading(false)

    setMachineModels(models)
  }, [models]);


  return (
    <div
      className={`tab-pane fade ${tab == "models" ? "active show" : ""
        }`}
      id="models"
      role="tabpanel"
    >
      <div className="card card-xl-stretch mb-xl-10">
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder mb-2 text-dark">Models</span>
          </h3>

          <div className="card-toolbar">
          <PermissionAbility permission="machines_model_add"> 
            <button
              className="btn btn-light-primary btn-md"
              onClick={() => setOpen(true)}
            >
              Add Model
            </button>
            </PermissionAbility>
          </div>

        </div>
        <div className="card-body pt-5">
          <div className="table-responsive">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px">Name</th>
                  <th className="min-w-50px">Space</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td>
                      <i className="fas fa-cog fa-spin"></i>{" "}
                      Loading...
                    </td>
                  </tr>
                ) : null}

                {machineModels?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={"/panel/machines/" + id + '/models/' + item.id}
                        className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                      >
                        {item.name}
                      </Link>
                    </td>

                    <td>{item.space}</td>

                    <td className="text-end">
                    <PermissionAbility permission="machines_model_show">
                      <Link
                        to={"/panel/machines/" + id + '/models/' + item.id}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                      </PermissionAbility>
                      <PermissionAbility permission="machines_model_edit"> 
                      <button onClick={() => { setModelId(item.id); setUpdateOpen(true); }} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <i className="fa fa-pen"></i>
                      </button>
                      </PermissionAbility>
                      <PermissionAbility permission="machines_model_delete">
                      <button
                        onClick={() => { setModelId(item.id); setConfirmDelete(true) }}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
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

      <Confirmation
        open={confirmDelete}
        onConfirm={() => {
          setConfirmDelete(false);
          deleteModel(modelId);
        }}
        onCancel={() => setConfirmDelete(false)}
      />

      <CreateMachineModel
        open={open}
        machineId={id}
        onCloseModal={() => onCloseModal()}
        onCreated={() => onChange()}
      />

      <EditMachineModel
        open={updateOpen}
        onCloseModal={() => onCloseModal()}
        onUpdated={() => onChange()}
        machineId={id}
        modelId={modelId}
      />
    </div>
  );
};

export default MachineModels;
