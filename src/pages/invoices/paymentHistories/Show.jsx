import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import InvoiceService from 'services/InvoiceService';
const ShowPaymentHistories = () => {
    let { id,paymentId } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState({});
    const getPaymentHistory = async () => {
        setPayment(await InvoiceService.getPaymentHistory(paymentId));
    };
  
    useEffect(() => {
      if (id) {
        getPaymentHistory();
      }
    }, [id]);
  return (
    <div className="d-flex flex-column-fluid">
    <div className="container">
      <div className="row">
        <div className="col-xl-4">
          <div className="card card-custom">
            <div className="card-header h-auto py-4">
              <div className="card-title">
                <h3 className="card-label">
                  <button
                    className="btn btn-sm btn-dark "
                    style={{ marginRight: "0.75rem" }}
                    onClick={() => navigate(-1)}
                  >
                    <i className="fa fa-arrow-left"></i>Back
                  </button>
                  Details
                </h3>
              </div>
            </div>

            <div className="card-body py-4">
              <div className="form-group row my-2">
                <label className="col-4 col-form-label">Id:</label>
                <div className="col-8">
                  <span className="form-control-plaintext font-weight-bolder">
                    {payment.id}
                  </span>
                </div>
              </div>
              <div className="form-group row my-2">
                <label className="col-4 col-form-label">Invoice number:</label>
                <div className="col-8">
                  <span className="form-control-plaintext font-weight- bolder">
                   {payment?.invoice?.invoice_number}
                  </span>
                </div>
              </div>
              <div className="form-group row my-2">
                <label className="col-4 col-form-label">Payment Mode:</label>
                <div className="col-8">
                  <span className="form-control-plaintext font-weight-bolder">
                  {payment.payment_mode}
                  </span>
                </div>
              </div>
              <div className="form-group row my-2">
                <label className="col-4 col-form-label">Payment Date:</label>
                <div className="col-8">
                  <span className="form-control-plaintext">
                    <span className="label label-inline label-danger label-bold">
                      <Moment format="D MMMM YYYY">
                      {payment.payment_date}
                      </Moment>
                    </span>
                  </span>
                </div>
              </div>
          
              <div className="form-group row my-2">
                <label className="col-4 col-form-label">Remarks:</label>
                <div className="col-8">
                  <span className="form-control-plaintext font-weight-bolder">
                    {payment.remarks ?? "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default ShowPaymentHistories