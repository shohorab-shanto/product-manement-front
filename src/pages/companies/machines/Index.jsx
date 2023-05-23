import Confirmation from 'components/utils/Confirmation';
import PermissionAbility from 'helpers/PermissionAbility';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import CompanyService from 'services/CompanyService';
import AddMachine from './Create';

const CompanyMachines = ({ active }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [machineId, setMachineId] = useState(null);
    const [machines, setMachines] = useState([]);
    console.log(machines);
    const [openAddMachine, setOpenAddMachine] = useState(false);
    const { id } = useParams();

    const onCloseModal = () => {
        setOpenAddMachine(false);
    };

    const getMachines = async () => {
        setMachines(await CompanyService.getMachines(id))
    }

    const detachMachine = async (machineId) => {
        await CompanyService.detachMachine(id, machineId)
        getMachines()
    }

    useEffect(() => {
        if (active && id)
            getMachines()
    }, [])

    return (
        <div
            className={active === 'machine' ? "tab-pane fade active show" : "tab-pane fade"}
            id="machines"
            role="tab-panel"
        >
            <div className="d-flex flex-column gacompanyIdgap-lg-10">
                <div className="card card-flush py-4">
                    <div className="card-header">
                        <div className="card-title">
                            <h2>Machine</h2>
                        </div>
                        <div className="card-toolbar">
                        <PermissionAbility permission="companies_machines_add">
                            <button
                                type="button"
                                className="btn btn-light-primary"
                                onClick={() => { setOpenAddMachine(true) }}
                            >
                                <span className="svg-icon svg-icon-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <rect
                                            opacity="0.3"
                                            x="2"
                                            y="2"
                                            width="20"
                                            height="20"
                                            rx="5"
                                            fill="black"
                                        ></rect>
                                        <rect
                                            x="10.8891"
                                            y="17.8033"
                                            width="12"
                                            height="2"
                                            rx="1"
                                            transform="rotate(-90 10.8891 17.8033)"
                                            fill="black"
                                        ></rect>
                                        <rect
                                            x="6.01041"
                                            y="10.9247"
                                            width="12"
                                            height="2"
                                            rx="1"
                                            fill="black"
                                        ></rect>
                                    </svg>
                                </span>
                                Add Machine
                            </button>
                            </PermissionAbility>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            <thead>
                                <tr className="fw-bolder text-muted">
                                    <th className="min-w-150px">Machine</th>
                                    <th className="min-w-150px">Model</th>
                                    <th className="min-w-120px">MFG Number</th>
                                    <th className="min-w-120px">Quantity</th>
                                    <th className="min-w-100px text-end">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {machines?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link
                                                to={'/panel/machines/' + item.machine.id}
                                                className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                                            >
                                                {item.machine.name}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={'/panel/machines/' + item.machine.id + '/models/' + item.machine_model.id}
                                                className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                                            >
                                                {item.machine_model.name}
                                            </Link>
                                        </td>

                                        <td>{item.mfg_number}</td>
                                        <td>{item.qty}</td>

                                        <td className="text-end">
                                        <PermissionAbility permission="companies_machines_dettach">
                                            <button
                                                onClick={() => {
                                                    setMachineId(item.id)
                                                    setConfirmDelete(true);
                                                }}
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                            >
                                                <i className='fa fa-unlink'></i>
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

            <AddMachine
                open={openAddMachine}
                onCloseModal={() => { onCloseModal() }}
                onCreate={() => { getMachines(); }}
                companyId={id}
            />

            <Confirmation
                message="Are you sure want to dettach the machine?"
                confirmText="Yes, detach"
                open={confirmDelete}
                onConfirm={() => {
                    setConfirmDelete(false);
                    detachMachine(machineId);
                }}
                onCancel={() => setConfirmDelete(false)}
            />
        </div>
    )
}

export default CompanyMachines
