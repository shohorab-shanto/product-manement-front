import Table from "components/utils/Table";
import PermissionAbility from "helpers/PermissionAbility";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeliverNoteService from "services/DeliverNoteService";
import InvoiceService from "services/InvoiceService";
import CreateInvoice from "./Create";
const Invoices = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [block, setBlock] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const storeDeliveryNotes = async (data) => {
    setBlock(true);
    await DeliverNoteService.create(data);
    setBlock(false);
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row?.invoice_number,
      sortable: true,
      field: "id",
    },
    {
      name: "Company",
      selector: (row) => row?.company?.name,
      sortable: true,
      field: "name",
      format: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <Link
              to={"/panel/companies/" + row?.company?.id}
              className="text-dark fw-bolder text-hover-primary"
            >
              {row?.company?.name}
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: "Requisition Type",
      selector: (row) =>
        row?.requisition?.type?.replaceAll("_", " ")?.capitalize(),
      sortable: true,
      field: "id",
    },
    {
      name: "Part Quantity",
      selector: (row) =>
        row?.part_items?.reduce((partialSum, a) => partialSum + a.quantity, 0),
      format: (row) => (
        <div className="mt-2">
          {row?.part_items?.reduce(
            (partialSum, a) => partialSum + a.quantity,
            0
          )}
        </div>
      ),
      sortable: true,
      field: "expected_delivery",
    },
    {
      name: "Total",
      selector: (row) =>
        row?.part_items?.reduce(
          (partialSum, a) => partialSum + a.total_value,
          0
        ),
      format: (row) => (
        <div className="mt-2">
          {row?.requisition?.type != "claim_report"
            ? row?.part_items?.reduce(
                (partialSum, a) => partialSum + parseInt(a.total_value),
                0
              )
            : 0}{" "}
          Tk.
        </div>
      ),
      sortable: true,
      field: "role",
    },

    {
      name: "DN number",
      selector: (row) => row?.deliveryNote?.dn_number,
      sortable: true,
      field: "role",
      format: (row) => (
        <div className="mt-2">
          {row?.deliveryNote?.dn_number
            ? row?.deliveryNote?.dn_number
            : "No delivery note yet"}
        </div>
      ),
    },

    {
      name: "Action",
      selector: (row) => row.status,
      format: (row) => (
        <>
          <span className="text-end">
            <PermissionAbility permission="invoices_show">
              <Link
                to={"/panel/invoices/" + row.id}
                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              >
                <i className="fa fa-eye"></i>
              </Link>
            </PermissionAbility>
          </span>
          <span className="text-end">
            <PermissionAbility permission="invoices_print">
              <Link
                to={"/panel/invoices/" + row.id + "/print"}
                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                target="_blank"
              >
                <i className="fa fa-print"></i>
              </Link>
            </PermissionAbility>
          </span>
          <span className="text-end">
            <PermissionAbility permission="invoices_generate_delivery_note">
              <div
                onClick={() =>
                  navigate(`/panel/delivery-notes/${row?.id}/create`)
                }
                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                data-toggle="tooltip"
                title="Add Delivery Note"
              >
                <i className="fa fa-plus"></i>
              </div>
            </PermissionAbility>
          </span>
        </>
      ),
    },
  ];

  const getInvoices = async (filters) => {
    setInvoices(await InvoiceService.getAll(filters));
    setLoading(false);
  };

  let navigate = useNavigate();
  return (
    <>
      <div className="post d-flex flex-column-fluid">
        <div className="container-xxl">
          <Table
            name="Quotations"
            buttonName="Add Invoice"
            onClickButton={onOpenModal}
            isLoading={loading}
            data={invoices}
            columns={columns}
            onFilter={getInvoices}
            buttonPermission="invoices_create"
          />
        </div>
      </div>
      <CreateInvoice
        open={open}
        onCloseModal={onCloseModal}
        getInvoices={getInvoices}
      />
    </>
  );
};

export default Invoices;
