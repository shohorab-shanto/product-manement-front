import PermissionAbility from "helpers/PermissionAbility";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DebounceInput } from "react-debounce-input";
function Table({
  name,
  buttonName,
  title,
  data,
  columns,
  isLoading,
  onFilter,
  onClickButton,
  buttonPermission,
  callbackButtons,
}) {
  const [filters, setFilters] = useState({
    order: {},
    page: 1,
    rows: 10,
  });

  //Handle ordering
  const handleOrder = (col, direction) => {
    setFilters({
      ...filters,
      order: { column: col.field, direction: direction },
    });
  };

  //Hadle pagination
  const handlePageChange = (num) => {
    setFilters({
      ...filters,
      page: num,
    });
  };

  //Handle rows per page
  const handlePerRowsChange = (num) => {
    setFilters({
      ...filters,
      rows: num,
    });
  };

  //Handle search
  const onSearch = (e) => {
    // if (e.key === "Enter")
      setFilters({
        ...filters,
        q: e.target.value,
      });
  };

  //Create event while order or filter updates
  useEffect(() => {
    if (typeof onFilter === "function")
      //Check if the handle had set for the filtering
      onFilter(filters);
  }, [filters]);

  return (
    <div className="card card-flush">
      <div className="card-header align-rows-center py-5 gap-2 gap-md-5">
        <div className="card-title">
          <div className="d-flex align-rows-center position-relative">
            <i className="fa fa-search position-absolute ms-4 my-5"></i>
            <DebounceInput
              type="text"
              debounceTimeout={500}
              data-filter="search"
              className="form-control form-control-solid w-250px ps-14"
              placeholder={"Search " + name}
              value={filters?.q}
              onChange={onSearch}
            />
          </div>
        </div>

        <div className="card-toolbar flex-row-fluid justify-content-end gap-5">
          {callbackButtons?.map(
            (itm, index) =>
              typeof onClickButton === "function" && (
                <PermissionAbility key={index} permission={itm.permission}>
                  <button
                    key={index}
                    type="button"
                    className="btn btn-light-primary btn-md"
                    onClick={() => {
                      if (typeof itm.callback === "function") itm.callback();
                    }}
                    dangerouslySetInnerHTML={{ __html: itm.name }}
                  ></button>
                </PermissionAbility>
              )
          )}
          {buttonName && (
            <PermissionAbility permission={buttonPermission}>
              <button
                type="button"
                className="btn btn-light-primary btn-md"
                onClick={() => {
                  if (typeof onClickButton === "function") onClickButton();
                }}
              >
                {buttonName}
              </button>
            </PermissionAbility>
          )}
        </div>
      </div>

      <div className="card-body pt-0">
        <DataTable
          title={title}
          columns={columns}
          data={data?.data}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={data.meta?.total}
          currentPage={data.meta?.current_page}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleOrder}
        />
      </div>
    </div>
  );
}

export default Table;
