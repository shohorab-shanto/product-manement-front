import React, { useEffect, useState } from "react";
import Modal from "components/utils/Modal";
import "react-datepicker/dist/react-datepicker.css";
import PartService from "services/PartService";

const EditPart = ({ open, onCloseModal, partId, onUpdated }) => {
  const [data, setData] = useState({
    remarks: "",
    description: "",
    image: "",
  });
  const [block, setBlock] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBlock(false);

    setData({
      ...data,
      [name]: value,
    });
  };

  // Set the selected image to preview
  const setImage = async (e) => {
    let logoShow = document.getElementById("logo");
    let fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);

    fr.addEventListener("load", function () {
      logoShow.style.backgroundImage = "url(" + this.result + ")";
    });
  };

  const updatePart = async () => {
    setBlock(true);
    let formData = new FormData(document.getElementById("part-update"));
    await PartService.update(partId, formData);
    onUpdated();
    onCloseModal();
  };



  const getPart = async () => {
    setBlock(true);
    let data = await PartService.get(partId);
    setData(data);
    setBlock(false);
  };

  useEffect(() => {
    setBlock(false);
    if (open) getPart();
  }, [open]);



  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Edit Part</>}
        body={
          <>
            <form id="part-update" encType="multipart/form-data">
              <div className="mb-5 fv-row fv-plugins-icon-container text-center">
                <div
                  className="mx-auto image-input image-input-outline image-input-changed"
                  data-kt-image-input="true"
                >
                  <div
                    id="logo"
                    className="image-input-wrapper w-125px h-125px"
                    style={{
                      backgroundImage:
                        "url(/assets/media/svg/files/blank-image.svg)",
                    }}
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
                      name="image"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        setImage(e);
                        handleChange(e);
                      }}
                    />
                  </label>
                </div>
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="image"
                ></div>
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
                  value={data.description ?? ""}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="description"
                ></div>
              </div>

              <div className="form-group mt-5">
                <label className="form-label">Remarks</label>
                <textarea
                  rows="3"
                  type="text"
                  className="form-control"
                  placeholder="Enter Remarks"
                  name="remarks"
                  id="remarks"
                  onChange={handleChange}
                  value={data.remarks ?? ""}
                />
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="remarks"
                ></div>
              </div>

              <button
                type="button"
                disabled={block}
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  updatePart();
                }}
              >
                Update
              </button>
              <button type="button" className="btn btn-secondary  mt-5 " onClick={onCloseModal}>
                Cancel
              </button>
            </form>
          </>
        }
      />
    </div>
  );
};

export default EditPart;
