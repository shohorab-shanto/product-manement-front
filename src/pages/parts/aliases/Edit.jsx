import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import MachineService from "services/MachineService";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import PartAliasService from "services/PartAliasService";
import MachinePartHeadingService from "services/PartHeadingService";
import { useParams } from "react-router-dom";

const EditPartAlias = ({ open, onCloseModal, onUpdated, aliasId }) => {
  let { id } = useParams();
  const [defaultMachine, setDefaultMachine] = useState(null)
  const [defaultHeading, setDefaultHeading] = useState(null)
  const [machines, setMachines] = useState([])
  const [headings, setHeadings] = useState([])
  const [data, setData] = useState({})
  const [block, setBlock] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBlock(false)

    setData({
      ...data, [name]: value
    })
  }

  const handleSelect = (option, conf) => {
    const value = option.value;
    const name = conf.name;
    setBlock(false)

    setData({
      ...data, [name]: value
    })
  }

  const getAlias = async () => {
    setBlock(true)
    let res = await PartAliasService.get(id, aliasId)
    setData(res);
    setBlock(false)
  }

  const updatePartAlias = async () => {
    setBlock(true)
    await PartAliasService.update(id, aliasId, data);
    onUpdated();
    onCloseModal();
    setBlock(false)
  }

  const getMachines = async () => {
    setBlock(false)
    let dt = await MachineService.allMachines();
    dt = dt.map(itm => ({ label: itm.name, value: itm.id })) //Parse the data as per the select requires
    setMachines(dt);
    setBlock(false)
  };

  const getHeadings = async (machineId) => {
    setBlock(false)
    let dt = await MachinePartHeadingService.getAll(machineId)
    dt = dt.map(itm => ({ label: itm.name, value: itm.id })) //Parse the data as per the select requires
    setHeadings(dt);
    setData({
      ...data, ...{ part_heading_id: null }
    })

    setBlock(false)
  };

  useEffect(() => {
    if (open) {
      setDefaultHeading({ label: data.heading?.name, value: data.heading?.id })
      setDefaultMachine({ label: data.machine?.name, value: data.machine?.id })
      setData({
        ...data, ...{ machine_id: data.machine?.id, part_heading_id: data.heading?.id }
      })
    }
  }, [data.machine]);

  useEffect(() => {
    if (data.machine_id && open)
      getHeadings(data.machine_id);
  }, [data.machine_id]);


  useEffect(() => {
    if (open) {
      getAlias();
      getMachines();
    }
    setBlock(false)
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Update Part Alias</>}
        body={
          <>
            <div className="form-group">
              <label className="form-label">Machine</label>
              {defaultMachine && <Select options={machines} onChange={handleSelect} name="machine_id" defaultValue={defaultMachine} />}
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="machine_id"></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Part Heading</label>
              {defaultHeading && <Select options={headings} onChange={handleSelect} name="part_heading_id" defaultValue={defaultHeading} />}
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="part_heading_id"></div>
            </div>

            <div className="form-group">
              <label className="required form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                id="name"
                onChange={handleChange}
                value={data.name ?? ''}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="name"></div>
            </div>

            <div className="form-group">
              <label className="required form-label">Part Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Part Number"
                name="part_number"
                id="part_number"
                onChange={handleChange}
                value={data.part_number ?? ''}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="part_number"></div>
            </div>

            <div className="form-group mt-5">
              <label className="form-label">Description</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Enter Description"
                name="description"
                id="description"
                onChange={handleChange}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="description"></div>
            </div>

            <button
              disabled={block}
              className="btn btn-primary mr-2 mt-5"
              style={{ marginRight: "1rem" }}
              onClick={() => { updatePartAlias() }}
            >
              Update
            </button>
            <button
              className="btn btn-secondary  mt-5 "
              onClick={onCloseModal}
            >
              Cancel
            </button>
          </>
        }
      />
    </div>
  );
};

export default EditPartAlias;
