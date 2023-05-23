import Table from "components/utils/Table";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ClientQuotationService from 'services/clientServices/ClientQuotationService';
// import CreateModal from "./CreateModal";

const ClientQuotations = () => {
  const [loading, setLoading] = useState(true);
  const [quotations, setQuotations] = useState([]);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true); 
  const onCloseModal = () => setOpen(false);

  const columns = [
    {
      name: "Id",
      selector: (row) => row?.pq_number,
      sortable: true,
      field: "id",
    },
  

    {
      name: "Requisition Type",
      selector: (row) => row?.requisition?.type?.replaceAll("_", " ")?.capitalize(),
      sortable: true,
      field: "id",
    },
    
    {
      name: "Part Quantity",
      selector: (row) => row?.part_items?.reduce((partialSum,a)=>partialSum + a.quantity ,0),
      format: (row) => (
        <div className='mt-2'>
          {row?.part_items?.reduce((partialSum,a)=>partialSum + a.quantity ,0)}
        </div>
      ),
      sortable: true,
      field: "expected_delivery",
    },
    {
      name: "Total",
      selector: (row) => row?.part_items?.reduce((partialSum,a)=>partialSum + a.total_value ,0),
      format: (row) => (
        <div className='mt-2'>
          {row?.requisition?.type != 'claim_report' ? (
            row?.part_items?.reduce((partialSum,a)=>partialSum + parseInt(a.total_value) ,0) 
          ):0} Tk.
         
        </div>
      ),
      sortable: true,
      field: "role",
    },

    {
      name: "Lock",
      selector: (row) => row?.locked_at,
      format: (row) => (
        <div className='mt-2'>
          {row?.locked_at ? (
            "Locked"
          ): "on-going"}
         
        </div>
      ),
      sortable: true,
      field: "id",
    },

    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      field: "role",
      format: (row) => (
        <>
          {row?.status == "pending" && <div className="mt-2 text-white bg-warning p-1 px-2 rounded">Pending</div>}
          {row?.status == "approved" && <div className="mt-2 text-white bg-success p-1 px-2 rounded">Approved</div>}
          {row?.status == "rejected" && <div className="mt-2 text-white bg-danger p-1 px-2 rounded">Rejected</div>}
          {row?.status == null && <div className="mt-2 text-white bg-success p-1 px-2 rounded">--</div>}
        </>
      ),
    },

    {
      name: "IN Number",
      selector: (row) => row?.invoice?.invoice_number,
      sortable: true,
      field: "id",
      format: (row) => (
        <div className='mt-2'>
          {row?.invoice?.invoice_number ? (
            row?.invoice?.invoice_number
          ): "No invoice yet"}
         
        </div>
      ),
    }, 
  
   
    {
      name: "Action",
      selector: (row) => row.status,
      format: (row) => (
        <span className="text-end">
          <Link
            to={"/panel/client/quotations/" + row.id}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <i className="fa fa-eye"></i>
          </Link> 
        </span>
      ),
    },
  ];

  const getQuotations = async (filters) => {
    setQuotations(await ClientQuotationService.getAll(filters));
    setLoading(false);
  };
  let navigate = useNavigate()

  const routeChange = ()=>{
      let path = `create`;
      navigate(path)
  }


  return (
    <>
    
    <div className="post d-flex flex-column-fluid">
      <div className="container-xxl">
        <Table
          name="Quotations"
          buttonName="Add Quotation"
          // onClickButton={onOpenModal}
          isLoading={loading}
          data={quotations}
          columns={columns}
          onFilter={getQuotations}
          buttonPermission="quotations_create"
        />
      </div>
    </div>
    
    

    {/* <CreateModal
        open={open}
        onCloseModal={onCloseModal}
        getQuotations = {getQuotations}
      /> */}
</>
    
  )
}

export default ClientQuotations