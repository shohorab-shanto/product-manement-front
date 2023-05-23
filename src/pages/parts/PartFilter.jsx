import { useEffect, useState } from "react";
import Select from "react-select";
import MachineService from "services/MachineService";
import MachinePartHeadingService from "services/PartHeadingService";

function PartFilter({ enable, onChange }) {

    const [data, setData] = useState({
        stock: 'all',
        machine_id: null,
        part_heading_id: null,
    })
    const [machines, setMachines] = useState([])
    const [headings, setHeadings] = useState([])
    const [defaultMachine, setDefaultMachine] = useState(null)
    const [defaultHeading, setDefaultHeading] = useState(null)

    let custom = { zIndex: 105, position: 'fixed', inset: '0px 0px auto auto', margin: 0, transform: 'translate(-100%, 50%)' };

    const apply = () => {
        typeof onChange === 'function' && onChange(data)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSelect = (option, action) => {
        const value = option.value;
        const name = action.name;

        setData({
            ...data, [name]: value
        })

        if (name === 'machine_id')
            setDefaultMachine({
                label: option.label,
                value: value
            })

        if (name === 'part_heading_id')
            setDefaultHeading({
                label: option.label,
                value: value
            })
    }

    const getMachines = async () => {
        let dt = await MachineService.getAll()
        dt = dt?.data?.map((itm) => { return { label: itm.name, value: itm.id } });
        setMachines(dt)
    }

    const getHeadings = async (machineId) => {
        let dt = await MachinePartHeadingService.getAll(machineId)
        dt = dt.map((itm) => { return { label: itm.name, value: itm.id } });
        setHeadings(dt)
    }

    const reset = () => {
        setData({
            stock: 'all',
            machine_id: null,
            part_heading_id: null
        })

        setDefaultMachine(null)
        setDefaultHeading(null)

        typeof onChange === 'function' && onChange({
            stock: 'all',
            machine_id: null,
            part_heading_id: null,
        })
    }

    useEffect(() => {
        if (enable && !machines.length)
            getMachines()

        if (!defaultMachine)
            setDefaultHeading(null)
    }, [enable])

    useEffect(() => {
        if (enable)
            getHeadings(data.machine_id)
    }, [data.machine_id])


    return (
        <>
            <div className={enable ? "menu menu-sub menu-sub-dropdown w-250px w-md-300px show" : "menu menu-sub menu-sub-dropdown w-250px w-md-300px"} style={custom}>
                <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bolder">Filter Options</div>
                </div>
                <div className="separator border-gray-200"></div>
                <div className="px-7 py-5">
                    <div className="mb-10">
                        <label className="form-label fw-bold">Machine:</label>
                        <Select
                            options={machines}
                            onChange={(option, action) =>
                                handleSelect(option, action)
                            }
                            name="machine_id"
                            value={defaultMachine}
                        />
                    </div>
                    <div className="mb-10">
                        <label className="form-label fw-bold">Part Heading:</label>
                        <Select
                            options={headings}
                            onChange={(option, action) =>
                                handleSelect(option, action)
                            }
                            name="part_heading_id"
                            value={defaultHeading}
                        />
                    </div>
                    {/* <div className="mb-10">
                        <label className="form-label fw-bold">Stock:</label>
                        <div className="d-flex">
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input className="form-check-input" type="radio" value="all" name="stock" checked={data.stock === 'all'} onChange={(e) => { handleChange(e) }} />
                                <span className="form-check-label">All</span>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                                <input className="form-check-input" type="radio" value="available" name="stock" checked={data.stock === 'available'} onChange={(e) => { handleChange(e) }} />
                                <span className="form-check-label">Available</span>
                            </label>
                            <label className="form-check form-check-sm form-check-custom form-check-solid">
                                <input className="form-check-input" type="radio" value="unavailable" name="stock" checked={data.stock === 'unavailable'} onChange={(e) => { handleChange(e) }} />
                                <span className="form-check-label">Unavailable</span>
                            </label>
                        </div>
                    </div> */}

                    <div className="d-flex justify-content-end">
                        <button onClick={reset} type="button" className="btn btn-sm btn-light btn-active-light-primary me-2">Reset</button>
                        <button type="button" className="btn btn-sm btn-primary" onClick={() => { apply() }}>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartFilter