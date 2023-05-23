import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeliverNoteService from "services/DeliverNoteService";
import CreateDeliveryNote from "./Create";
const DeliveryNotes = () => {
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState([]);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const getDeliverNotes = async (filters) => {
    setDeliveryNotes(await DeliverNoteService.getAll(filters));
    setLoading(false);
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row?.dn_number,
      sortable: true,
      field: "id",
    },
    {
      name: "Company",
      selector: (row) => row?.invoice?.company?.name,
      sortable: true,
      field: "name",
      format: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <div className="text-dark fw-bolder text-hover-primary">
              {row?.invoice?.company?.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Invoice Number",
      selector: (row) => row?.invoice?.invoice_number,
      format: (row) => (
        <div className="mt-2">{row?.invoice?.invoice_number}</div>
      ),
      sortable: true,
      field: "expected_delivery",
    },

    {
      name: "Action",
      selector: (row) => row.status,
      format: (row) => (
        <>
          {/* to show delivery note */}
          <span className="text-end">
          <PermissionAbility permission="deliverynotes_show">
          <Link
              to={"/panel/delivery-notes/" + row.id }  
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </PermissionAbility>
          </span>

          <span className="text-end">
          <PermissionAbility permission="deliverynotes_print">
          <Link
              to={"/panel/delivery-notes/" + row.id + "/print"}
              target="_blank"
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="fa fa-print"></i> 
            </Link>
          </PermissionAbility>
            
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Delivery Notes"
            buttonName="Add Delivery Note"
            onClickButton={onOpenModal}
            isLoading={loading}
            data={deliveryNotes}
            columns={columns}
            onFilter={getDeliverNotes}
            buttonPermission="deliverynotes_create"
          />
        </div>
      </div>
      <CreateDeliveryNote
        open={open}
        onCloseModal={onCloseModal}
        getDeliverNotes={getDeliverNotes}
      />
    </>
  );
};

export default DeliveryNotes;
