import PermissionAbility from "helpers/PermissionAbility";
import { PrivateRoute } from "helpers/PrivateRoute";
import AccountSettings from "pages/auth/AccountSettings";
import Login from "pages/auth/Login";
import Profile from "pages/auth/Profile";
import BoxHeadings from "pages/box-headings/Index";
import BoxHeadingShow from "pages/box-headings/Show";
import ClientContract from "pages/client/client-contract/index";
import ClientContractShow from "pages/client/client-contract/show";
import ClientCompanyMachines from "pages/client/client-machines/index";
import ClientDashboard from "pages/client/dashboard/ClientDashboard";
import ClientDeliveryNotes from "pages/client/delivery-notes";
import CreateClientDelivery from "pages/client/delivery-notes/create";
import PrintClientDeliveryNotes from "pages/client/delivery-notes/print";
import ShowClientDeliveryNotes from "pages/client/delivery-notes/show";
import ClientInvoices from "pages/client/invoices";
import PrintClientInvoice from "pages/client/invoices/print";
import ShowClientInvoice from "pages/client/invoices/show";
import CreateClientQuotation from "pages/client/quotations/create";
import ClientQuotation from "pages/client/quotations/index.jsx";
import ShowClientQuotation from "pages/client/quotations/show";
import ClientRequiredRequisitions from "pages/client/requierd_requisitions/Index";
import ClientShowRequiredRequisition from "pages/client/requierd_requisitions/Show";
import ClientRequisitions from "pages/client/requisitions";
import ClientRequisitionCreate from "pages/client/requisitions/create";
import PrintClientRequisition from "pages/client/requisitions/print";
import ShowClientRequisition from "pages/client/requisitions/show";
import CompanyUser from "pages/client/user/index";
import CompanyUserShow from "pages/client/user/show";
import Companies from "pages/companies/Index";
import ShowCompany from "pages/companies/Show";
import ShowUser from "pages/companies/users/Show";
import Contracts from "pages/contracts/Index";
import ShowContract from "pages/contracts/Show";
import Dashboard from "pages/dashboard/Dashboard";
import CreateDelivery from "pages/delivery-notes/CreateDelivery";
import DeliveryNotes from "pages/delivery-notes/Index";
import PrintDeliveryNotes from "pages/delivery-notes/Print";
import ShowDeliveryNotes from "pages/delivery-notes/Show";
import Designations from "pages/designations/Index";
import ShowDesignation from "pages/designations/Show";
import Employee from "pages/employee/Index";
import ShowEmployee from "pages/employee/Show";
import Forbidden from "pages/Forbidden";
import GatePass from "pages/gate-passes/Index";
import Invoices from "pages/invoices/Index";
import ShowPaymentHistories from "pages/invoices/paymentHistories/Show";
import PrintInvoice from "pages/invoices/Print";
import ShowInvoice from "pages/invoices/Show";
import AppLayout from "pages/layouts/AppLayout";
import ShowPartHeadings from "pages/machines/headings/Show";
import Machines from "pages/machines/Index";
import ShowMachineModel from "pages/machines/models/Show";
import ShowMachine from "pages/machines/Show";
import NotFound from "pages/NotFound";
import ShowPartAlias from "pages/parts/aliases/Show";
import Parts from "pages/parts/Index";
import ShowPart from "pages/parts/Show";
import ShowStock from "pages/parts/stocks/Show";
import CreateQuotation from "pages/quotations/Create";
import Quotations from "pages/quotations/Index";
import ShowQuotation from "pages/quotations/Show";
import Reports from "pages/reports/Index";
import PartStockReport from "pages/reports/PartStockReport";
import RequiredRequisitionCreate from "pages/requierd_requisitions/Create";
import RequiredRequisitions from "pages/requierd_requisitions/Index";
import ShowRequiredRequisition from "pages/requierd_requisitions/Show";
import RequisitionCreate from "pages/requisitions/Create";
import Requisitions from "pages/requisitions/Index";
import PrintRequisition from "pages/requisitions/Print";
import ShowRequisition from "pages/requisitions/Show";
import Roles from "pages/roles/Index";
import ShowPermission from "pages/roles/Show";
import Settings from "pages/Settings/Index";
import WareHouse from "pages/warehouses/Index";
import WareHouseShow from "pages/warehouses/Show";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/panel/*" element={<AppLayout />}>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* <Route path="employees" element={<Employee />} /> */}
            {/* Designation start */}

            <Route
              path="designations"
              element={
                <PrivateRoute>
                  <PermissionAbility permission="designations_access">
                    <Designations />
                  </PermissionAbility>
                </PrivateRoute>
              }
            />
            <Route
              path="designations/:id"
              element={
                <PrivateRoute>
                  <ShowDesignation />
                </PrivateRoute>
              }
            />

            {/* Designation end */}

            {/* Employee Start */}
            <Route
              path="employees"
              element={
                <PrivateRoute>
                  <Employee />
                </PrivateRoute>
              }
            />
            <Route
              path="employees/:id"
              element={
                <PrivateRoute>
                  <ShowEmployee />
                </PrivateRoute>
              }
            />
            {/* Employee End */}
            {/* Role Start */}
            <Route
              path="roles"
              element={
                <PrivateRoute>
                  <Roles />
                </PrivateRoute>
              }
            />

            <Route
              path="roles/:id"
              element={
                <PrivateRoute>
                  <ShowPermission />
                </PrivateRoute>
              }
            />

            {/* Role End */}

            <Route
              path="companies"
              element={
                <PrivateRoute>
                  <Companies />
                </PrivateRoute>
              }
            />
            <Route
              path="companies/:id"
              element={
                <PrivateRoute>
                  <ShowCompany />
                </PrivateRoute>
              }
            />
            <Route
              path="companies/:companyId/users/:id"
              element={
                <PrivateRoute>
                  <ShowUser />
                </PrivateRoute>
              }
            />

            <Route
              path="contracts"
              element={
                <PrivateRoute>
                  <Contracts />
                </PrivateRoute>
              }
            />
            <Route
              path="contracts/:id"
              element={
                <PrivateRoute>
                  <ShowContract />
                </PrivateRoute>
              }
            />

            {/* WareHouse Start */}
            <Route
              path="warehouses"
              element={
                <PrivateRoute>
                  <WareHouse />
                </PrivateRoute>
              }
            />
            <Route
              path="warehouses/:id"
              element={
                <PrivateRoute>
                  <WareHouseShow />
                </PrivateRoute>
              }
            />
            {/* WareHouse End */}

            {/* Box Heading Start */}
            <Route
              path="box-headings"
              element={
                <PrivateRoute>
                  <BoxHeadings />
                </PrivateRoute>
              }
            />
            <Route
              path="box-headings/:boxId"
              element={
                <PrivateRoute>
                  <BoxHeadingShow />
                </PrivateRoute>
              }
            />
            {/* Box Heading End */}

            {/* Machine Start */}
            <Route
              path="machines"
              element={
                <PrivateRoute>
                  <Machines />
                </PrivateRoute>
              }
            />
            <Route
              path="machines/:id"
              element={
                <PrivateRoute>
                  <ShowMachine />
                </PrivateRoute>
              }
            />
            <Route
              path="machines/:machineId/models/:modelId"
              element={
                <PrivateRoute>
                  <ShowMachineModel />
                </PrivateRoute>
              }
            />

            <Route
              path="machines/:machineId/part-headings/:headingId"
              element={
                <PrivateRoute>
                  <ShowPartHeadings />
                </PrivateRoute>
              }
            />
            {/* Machine End */}

            {/* Parts start */}
            <Route
              path="parts"
              element={
                <PrivateRoute>
                  <Parts />
                </PrivateRoute>
              }
            />
            <Route
              path="parts/:id"
              element={
                <PrivateRoute>
                  <ShowPart />
                </PrivateRoute>
              }
            />

            <Route
              path="parts/:partId/aliases/:aliasId"
              element={
                <PrivateRoute>
                  <ShowPartAlias />
                </PrivateRoute>
              }
            />

            <Route
              path="parts/:partId/stocks/:stockId"
              element={
                <PrivateRoute>
                  <ShowStock />
                </PrivateRoute>
              }
            />
            {/* Parts end */}

            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="profile/settings"
              element={
                <PrivateRoute>
                  <AccountSettings />
                </PrivateRoute>
              }
            />

            {/* Settings Start */}

            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />

            {/* Settings End */}

            {/* Requisitions Start */}
            <Route
              path="requisitions/create"
              element={
                <PrivateRoute>
                  <RequisitionCreate />
                </PrivateRoute>
              }
            />

            <Route
              path="requisitions"
              element={
                <PrivateRoute>
                  <Requisitions />
                </PrivateRoute>
              }
            />

            <Route
              path="requisitions/:id"
              element={
                <PrivateRoute>
                  <ShowRequisition />
                </PrivateRoute>
              }
            />
            {/* Print Requisition */}
            <Route
              path="requisitions/:id/print"
              element={
                <PrivateRoute>
                  <PrintRequisition />
                </PrivateRoute>
              }
            />

            {/* Requisitions End */}

            {/* Required Requisition Start*/}

            <Route
              path="require_req/create/:id"
              element={
                <PrivateRoute>
                  <RequiredRequisitionCreate />
                </PrivateRoute>
              }
            />

            <Route
              path="require_req"
              element={
                <PrivateRoute>
                  <RequiredRequisitions />
                </PrivateRoute>
              }
            />

            <Route
              path="require_req/:id"
              element={
                <PrivateRoute>
                  <ShowRequiredRequisition />
                </PrivateRoute>
              }
            />

            {/* Required Requisition End*/}

            {/* Quotation Start */}

            <Route
              path="quotations"
              element={
                <PrivateRoute>
                  <Quotations />
                </PrivateRoute>
              }
            />

            <Route
              path="quotations/:id"
              element={
                <PrivateRoute>
                  <ShowQuotation />
                </PrivateRoute>
              }
            />

            <Route
              path="quotations/:requisitionId/create"
              element={
                <PrivateRoute>
                  <CreateQuotation />
                </PrivateRoute>
              }
            />

            {/* Quotation End */}

            {/* Invoice Start */}

            <Route
              path="invoices"
              element={
                <PrivateRoute>
                  <Invoices />
                </PrivateRoute>
              }
            />
            <Route
              path="invoices/:id"
              element={
                <PrivateRoute>
                  <ShowInvoice />
                </PrivateRoute>
              }
            />

            <Route
              path="invoices/:id/print"
              element={
                <PrivateRoute>
                  <PrintInvoice />
                </PrivateRoute>
              }
            />

            <Route
              path="invoices/:id/payment-histories/:paymentId"
              element={
                <PrivateRoute>
                  <ShowPaymentHistories />
                </PrivateRoute>
              }
            />

            {/* Invoice End */}

            {/* Delivery Notes Start */}
            <Route
              path="delivery-notes"
              element={
                <PrivateRoute>
                  <DeliveryNotes />
                </PrivateRoute>
              }
            />

            <Route
              path="delivery-notes/:id/print"
              element={
                <PrivateRoute>
                  <PrintDeliveryNotes />
                </PrivateRoute>
              }
            />

            <Route
              path="delivery-notes/:id"
              element={
                <PrivateRoute>
                  <ShowDeliveryNotes />
                </PrivateRoute>
              }
            />

            <Route
              path="delivery-notes/:invoiceId/create"
              element={
                <PrivateRoute>
                  <CreateDelivery />
                </PrivateRoute>
              }
            />

            {/* Delivery Notes End; */}

            {/* Report Start */}
            <Route
              path="reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />

            <Route
              path="part-stock-report"
              element={
                <PrivateRoute>
                  <PartStockReport />
                </PrivateRoute>
              }
            />
            {/* Report End */}

            {/* Gate pass Start */}
            <Route
              path="gate-passes"
              element={
                <PrivateRoute>
                  <GatePass />
                </PrivateRoute>
              }
            />
            {/* Gate pass End */}

            {/* Routes for company users */}

            {/* Routes for company users */}

            <Route
              path="client/dashboard"
              element={
                <PrivateRoute>
                  <ClientDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="companies/user"
              element={
                <PrivateRoute>
                  <CompanyUser />
                </PrivateRoute>
              }
            />

            <Route
              path="companies/user/:id"
              element={
                <PrivateRoute>
                  <CompanyUserShow />
                </PrivateRoute>
              }
            />

            <Route
              path="company/user/machines"
              element={
                <PrivateRoute>
                  <ClientCompanyMachines />
                </PrivateRoute>
              }
            />
            {/* client contract start */}
            <Route
              path="companies/user/contracts"
              element={
                <PrivateRoute>
                  <ClientContract />
                </PrivateRoute>
              }
            />

            <Route
              path="client/contracts/:id"
              element={
                <PrivateRoute>
                  <ClientContractShow />
                </PrivateRoute>
              }
            />

            {/* client contract end */}

            {/* company user sales start */}

            {/* client requisition start */}
            <Route
              path="client-requisitions"
              element={
                <PrivateRoute>
                  <ClientRequisitions />
                </PrivateRoute>
              }
            />

            <Route
              path="client-requisitions/create"
              element={
                <PrivateRoute>
                  <ClientRequisitionCreate />
                </PrivateRoute>
              }
            />

            <Route
              path="client/requisitions/:id"
              element={
                <PrivateRoute>
                  <ShowClientRequisition />
                </PrivateRoute>
              }
            />

            <Route
              path="client/requisitions/:id/print"
              element={
                <PrivateRoute>
                  <PrintClientRequisition />
                </PrivateRoute>
              }
            />

            {/* client requisition end */}

            {/* client required requisition start */}
            <Route
              path="client-required-requisitions"
              element={
                <PrivateRoute>
                  <ClientRequiredRequisitions />
                </PrivateRoute>
              }
            />

            {/* <Route
              path="client-requisitions/create"
              element={
                <PrivateRoute>
                  <ClientRequisitionCreate />
                </PrivateRoute>
              }
            /> */}

            <Route
              path="client_require_req/:id"
              element={
                <PrivateRoute>
                  <ClientShowRequiredRequisition />
                </PrivateRoute>
              }
            />

            {/* <Route
              path="client/requisitions/:id/print"
              element={
                <PrivateRoute>
                  <PrintClientRequisition />
                </PrivateRoute>
              }
            /> */}

            {/* client required requisition end */}

            {/* client quotation start */}

            <Route
              path="client-quotations"
              element={
                <PrivateRoute>
                  <ClientQuotation />
                </PrivateRoute>
              }
            />

            <Route
              path="client/quotations/:requisitionId/create"
              element={
                <PrivateRoute>
                  <CreateClientQuotation />
                </PrivateRoute>
              }
            />

            <Route
              path="client/quotations/:id"
              element={
                <PrivateRoute>
                  <ShowClientQuotation />
                </PrivateRoute>
              }
            />

            {/* client quotation end */}

            <Route
              path="client-invoice"
              element={
                <PrivateRoute>
                  <ClientInvoices />
                </PrivateRoute>
              }
            />

            <Route
              path="client/invoices/:id"
              element={
                <PrivateRoute>
                  <ShowClientInvoice />
                </PrivateRoute>
              }
            />

            <Route
              path="client/invoices/:id/print"
              element={
                <PrivateRoute>
                  <PrintClientInvoice />
                </PrivateRoute>
              }
            />

            {/* delivery note */}

            <Route
              path="client-delivery-notes"
              element={
                <PrivateRoute>
                  <ClientDeliveryNotes />
                </PrivateRoute>
              }
            />

            <Route
              path="client/delivery-notes/:invoiceId/create"
              element={
                <PrivateRoute>
                  <CreateClientDelivery />
                </PrivateRoute>
              }
            />

            <Route
              path="client/delivery-notes/:id"
              element={
                <PrivateRoute>
                  <ShowClientDeliveryNotes />
                </PrivateRoute>
              }
            />

            <Route
              path="client/delivery-notes/:id/print"
              element={
                <PrivateRoute>
                  <PrintClientDeliveryNotes />
                </PrivateRoute>
              }
            />

            {/* company user sales end */}

            <Route path="403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
