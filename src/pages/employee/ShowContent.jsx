import { Activities } from "components/utils/Activities";
import React from "react";
import { useParams } from "react-router-dom";

const ShowContent = () => {
  const { id } = useParams();

  return (
    <div className="flex-lg-row-fluid ms-lg-15">
      <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
        <li className="nav-item">
          <a
            className="nav-link text-active-primary pb-4 active"
            data-bs-toggle="tab"
            href="#activities"
          >
            Activities
          </a>
        </li>
      </ul>

      <div className="tab-content" id="tabContent">
        <div
          className="tab-pane fade show active"
          id="activities"
          role="tabpanel"
        >
          <Activities logName="users" modelId={id} self={true} tab="activities" />
        </div>
      </div>
    </div>
  );
};

export default ShowContent;
