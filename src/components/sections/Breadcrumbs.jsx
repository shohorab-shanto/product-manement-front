
const Breadcrumbs = () => {
  return (
    <div className="d-flex align-items-center" id="kt_header_nav">
      <div
        data-kt-swapper="true"
        data-kt-swapper-mode="prepend"
        data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_header_nav'}"
        className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
      >
        <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">
          Current Page
        </h1>

        <span className="h-20px border-gray-300 border-start mx-4"></span>

        <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
          <li className="breadcrumb-item text-muted">
            <span
              className="text-muted"
            >
              Dashboard
            </span>
          </li>

          <li className="breadcrumb-item">
            <span className="bullet bg-gray-300 w-5px h-2px"></span>
          </li>

          <li className="breadcrumb-item text-dark">Current Page</li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
