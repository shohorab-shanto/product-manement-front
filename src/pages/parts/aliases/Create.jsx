import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import MachineService from "services/MachineService";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import PartAliasService from "services/PartAliasService";
import MachinePartHeadingService from "services/PartHeadingService";
import { useParams } from "react-router-dom";

const CreatePartAlias = ({ open, onCloseModal, onCreated }) => {
  let { id } = useParams();
  const [machines, setMachines] = useState([])
  const [headings, setHeadings] = useState([])
  const [data, setData] = useState({
    machine_id: '',
    machine_model_id: '',
    machine_heading_id: '',
    name: '',
    part_number: '',
    // old_part_number:'',
    description: ''
  })
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

  const createPartAlias = async () => {
    setBlock(true)
    await PartAliasService.create(id, data);
    onCreated();
    onCloseModal();
    setBlock(false)
  }

  const getMachines = async () => {
    setBlock(false)
    let data = await MachineService.getAll()
    data = data?.data.map(itm => ({ label: itm.name, value: itm.id })) //Parse the data as per the select requires
    setMachines(data);
    setBlock(false)
  };

  const getHeadings = async (machineId) => {
    setBlock(false)
    let data = await MachinePartHeadingService.getAll(machineId)
    data = data.map(itm => ({ label: itm.name, value: itm.id })) //Parse the data as per the select requires
    setHeadings(data);
    setBlock(false)
  };

  useEffect(() => {
    if (open)
      getHeadings(data.machine_id);
  }, [data.machine_id]);

  useEffect(() => {
    if (open) //Prevent preload data while modal is hidden
      getMachines();
    setBlock(false)
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Part Alias</>}
        body={
          <>
            <div className="form-group">
              <label className="required form-label">Machine</label>
              <Select options={machines} onChange={handleSelect} name="machine_id" />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="machine_id"></div>
            </div>

            <div className="form-group mt-5">
              <label className="required form-label">Part Heading</label>
              <Select options={headings} onChange={handleSelect} name="part_heading_id" />
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

            {/* <div className="form-group">
              <label className="form-label">Old Part Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Old Part Number"
                name="old_part_number"
                id="old_part_number"
                onChange={handleChange}
                value={data.old_part_number ?? ''}
              />
              <div className="fv-plugins-message-container invalid-feedback" htmlFor="old_part_number"></div>
            </div> */}

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
              onClick={() => { createPartAlias() }}
            >
              Submit
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

export default CreatePartAlias;
