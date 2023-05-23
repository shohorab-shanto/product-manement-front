import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../../components/utils/Modal";
import InvoiceService from "../../services/InvoiceService";
import Select from "react-select";
import DeliverNoteService from "services/DeliverNoteService";
const CreateDeliveryNote = ({ open, onCloseModal, getDeliverNotes }) => {
  const [block, setBlock] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState({}); //get invoice details
  const [invoiceId, setInvoiceId] = useState("");
  const [filter, setFilter] = useState({});
  const [searchData, setSearchData] = useState({});

  const navigate = useNavigate();

  const getInvoice = async () => {
    if (invoiceId) {
      let res = await InvoiceService.get(invoiceId);
      setInvoice(res);
    }
  };

  const InvoiceSearch = async () => {
    // console.log(filter);
    let res = await InvoiceService.getAll(filter);
    setSearchData(res.data);
  };

  const addInvoice = (item) => {
    setInvoiceId(item?.id);
    setSearchData([]);
  };

  //new add
  const filterData = (e) => {
    let query = e.target.value;
    setFilter({
      ...filter,
      q: query,
    });
  };

  const search = async (e) => {
    e.keyCode === 13 && (await InvoiceSearch());
    if (filter?.q === "") setSearchData([]);
  };
  useEffect(() => {
    if (open) {
    }
  }, [open]);

  useEffect(() => {
    getInvoice();
  }, [invoiceId]);

  return (
    <div>
      <Modal
        open={open}
        onCloseModal={onCloseModal}
        title={<>Create Delivery Note</>}
        body={
          <>
            <div>
              <div className="form-group mt-5">
                <label className="required form-label">Invoice</label>

                {/* new add */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor=""></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="search"
                      value={filter.q || ""}
                      onChange={filterData}
                      onKeyUp={search}
                    />
                    <div>
                      {searchData.length > 0 ? (
                        <div className="card border border-secondary ">
                          <div className="card-body ">
                            {searchData?.map((item, index) => (
                              <>
                                <div key={index}>
                                  <Link
                                    to={item?.id}
                                    style={{ color: "black" }}
                                    onClick={() => addInvoice(item)}
                                  >
                                    <p>{item?.invoice_number}</p>
                                  </Link>
                                </div>
                                <hr />
                              </>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary mr-2 mt-5"
                style={{ marginRight: "1rem" }}
                onClick={() =>
                  navigate(`/panel/delivery-notes/${invoiceId}/create`)
                }
              >
                Create
              </button>
              <button
                type="reset"
                className="btn btn-secondary  mt-5 "
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </>
        }
      />
    </div>
  );
};

export default CreateDeliveryNote;
