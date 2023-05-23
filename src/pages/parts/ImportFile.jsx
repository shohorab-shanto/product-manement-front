import Modal from "components/utils/Modal";
import React, { useState, useEffect } from "react";
import PartService from "services/PartService";

const ImportFile = ({ open, onCloseModal, onImported }) => {
    const [file,setFile] = useState("");
    const [block, setBlock] = useState(false);

    const ImportFile = async () => {
        setBlock(true)
        let formData = new FormData(document.getElementById("part-import"));
        await PartService.importFile(formData);
        onImported();
        onCloseModal();
        setBlock(false)
      }

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Import File</>}
        body={
          <>
            <form id="part-import">
              <div className="mb-5 fv-row fv-plugins-icon-container text-center">
                <div
                  className="mx-auto image-input image-input-outline image-input-changed"
                  data-kt-image-input="true"
                >
                  {/* <div
                    id="logo"
                    className="image-input-wrapper w-125px h-125px"
                    style={{
                      backgroundImage:
                        "url(/assets/media/svg/files/blank-image.svg)",
                    }}
                  ></div> */}
                  <label className="btn btn-primary d-block" htmlFor="file">
                    Upload
                    {/* <i className="bi bi-pencil-fill fs-7"></i> */}
                  </label>
                  <input
                    className="d-none"
                    type="file"
                    name="file"
                    accept=".xlsx"
                    id="file"
                      onChange={(e) =>  setFile(e.target.files[0]) }
                  />

                  <button
                    // disabled={block}
                    type="button"
                    className="btn btn-primary mr-2 mt-5"
                    style={{ marginRight: "1rem" }}
                    onClick={() => ImportFile() }
                  >
                    Submit
                  </button>
                  <button
                  type="button"
                    className="btn btn-secondary  mt-5 "
                    onClick={onCloseModal}
                  >
                    Cancel
                  </button>
                </div>
                <div
                  className="fv-plugins-message-container invalid-feedback"
                  htmlFor="image"
                ></div>
              </div>
            </form>
          </>
        }
      />
    </div>
  );
};

export default ImportFile;
