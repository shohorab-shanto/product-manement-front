import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

const BorderlessTable = ({ headers, records, title, url }) => {
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-0 mb-1">{title}</h4>

        <div className="table-responsive">
          <Table className="mb-0" borderless>
            <thead className="table-light">
              <tr>
                {headers?.map((itm, index) => (
                  <th scope="col" key={index}>
                    {itm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records?.map((record, index) => {
                var data = [];
                for (var key in record) {
                  data.push(record[key]);
                }
                return (
                  <tr key={index}>
                    {data.map((item) => {
                      return (
                        <td>
                          <a
                            href={url + record["id"]}
                            style={{ color: "#000" }}
                            target="_blank"
                          >
                            {item}
                          </a>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BorderlessTable;
