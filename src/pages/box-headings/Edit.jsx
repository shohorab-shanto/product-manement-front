import React, { useState, useEffect } from "react";
import Modal from "components/utils/Modal";
import BoxHeadingService from "services/BoxHeadingService";

const EditBoxHeading = ({ open, onCloseModal, onChange, boxId }) => {
  const [boxHeading, setBoxHeading] = useState("");
  const [data, setData] = useState({ name: "", description: "" });

  const getBox = async () => {
    setBoxHeading(await BoxHeadingService.get(boxId));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    let tempdata = { ...data };
    tempdata[name] = value;

    setData(tempdata);
  };

  const updateBox = async () => {
    await BoxHeadingService.update(boxId, data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateBox();
    onChange();
    onCloseModal();
  };

  useEffect(() => {
    if (boxId) {
      getBox();
    }
  }, [open, boxId]);

  useEffect(() => {
    setData(boxHeading);
  }, [boxHeading]);

  useEffect(() => {
    let tempdata = { ...data };
    tempdata.name = boxHeading.name;
    tempdata.description = boxHeading.description;
    setData(tempdata);
  }, [boxHeading]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Box Heading</>}
        id={boxId}
        body={
          <>
            <form>
              <div className="form-group">
                <input
                  disabled
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  id="name"
                  value={data.name || ""}
                />
              </div>

              <div className="form-group mt-5">
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
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
    </div>
  );
};

export default EditBoxHeading;
