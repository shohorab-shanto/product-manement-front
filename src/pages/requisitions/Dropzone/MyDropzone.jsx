import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

// const uploadFile = async (formData) => {
//   await RequisitionService.fileUpload(id, formData);
//   getFile();
// };

const MyDropzone = ({ onDrop }) => {
  const onAdded = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((item) => {
      formData.append("files[]", item);
    })
    if (typeof onDrop === "function") onDrop(formData);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop: onAdded });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <input name="files[]" {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p> 
      </div>
    </>
  );
};

export default MyDropzone;
