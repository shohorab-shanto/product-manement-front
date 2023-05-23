import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PermissionAbility from "helpers/PermissionAbility";
import Confirmation from 'components/utils/Confirmation';
import PartAliasService from 'services/PartAliasService';
import CreatePartAlias from './Create';
import EditPartAlias from './Edit';

const PartAliases = ({ tab }) => {
  const [loading, setLoading] = useState(true);
  const [aliasId, setAliasId] = useState(null);
  const [aliases, setAliases] = useState([]);
  const {id} = useParams()

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const onCloseModal = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const getAliases = async () => {
    setLoading(true)
    setAliases(await PartAliasService.getAll(id));
    setLoading(false)
  };

  const deleteAlias = async () => {
    await PartAliasService.remove(id, aliasId);
    getAliases()
  };

  useEffect(() => {
    if (tab == 'aliases')
      getAliases();
    setLoading(false)
  }, [tab]);


  return (
    <div
      className={`tab-pane fade ${tab == "aliases" ? "active show" : ""
        }`}
      id="models"
      role="tabpanel"
    >
      <div className="card card-xl-stretch mb-xl-10">
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder mb-2 text-dark">Aliases</span>
          </h3>

          <div className="card-toolbar">
          <PermissionAbility permission="parts_aliases_add">
            <button
              className="btn btn-light-primary btn-md"
              onClick={() => setOpen(true)}
            >
              Create Alias
            </button>
            </PermissionAbility>
          </div>

        </div>
        <div className="card-body pt-5">
          <div className="table-responsive">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-140px">Name</th>
                  <th className="min-w-100px">Machine</th>
                  <th className="min-w-120px">Part Heading</th>
                  <th className="min-w-100px">Part Number</th>
                  <th className="min-w-100px">Old Part Number</th>
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

                {!loading && aliases?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={"/panel/parts/" +id+ '/aliases/' + item.id}
                        className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                      >
                        {item.name}
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={"/panel/machines/" + item.machine?.id}
                        className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6"
                      >
                        {item.machine?.name}
                      </Link>
                    </td>

                    <td>
                      {item.heading?.name}
                    </td>

                    <td>
                      {item.part_number}
                    </td>

                    <td>
                      {item.old_part_number.map(item=><p>{item}</p>)}
                      
                    </td>

                    <td className="text-end">
                      <PermissionAbility permission="parts_aliases_show">
                      <Link
                        to={"/panel/parts/" +id+ '/aliases/' + item.id}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                      </PermissionAbility>

                      <PermissionAbility permission="parts_aliases_edit">
                      <button onClick={() => { setAliasId(item.id); setUpdateOpen(true); }} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <i className="fa fa-pen"></i>
                      </button>
                      </PermissionAbility>
                      
                      <PermissionAbility permission="parts_aliases_delete">
                      <button
                        onClick={() => { setAliasId(item.id); setConfirmDelete(true) }}
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
          deleteAlias();
        }}
        onCancel={() => setConfirmDelete(false)}
      />

      <CreatePartAlias
        open={open}
        onCloseModal={() => onCloseModal()}
        onCreated={() => getAliases()}
      />

      <EditPartAlias
        open={updateOpen}
        onCloseModal={() => onCloseModal()}
        onUpdated={() => getAliases()}
        id={id}
        aliasId={aliasId}
      />
    </div>
  );
};

export default PartAliases;
