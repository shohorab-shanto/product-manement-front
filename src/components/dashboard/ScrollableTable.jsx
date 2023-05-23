import { Card, Table } from "react-bootstrap";

const ScrollableTable = ({ headers, records, title, url, height }) => {
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-0 mb-1">{title}</h4>

        <div className="table-responsive" style={{ height: height ?? "" }}>
          <Table className="mb-0" borderless>
            <thead
              className="table-light"
              style={{ position: "sticky", top: 0 }}
            >
              <tr>
                {headers?.map((itm, index) => (
                  <th scope="col" key={index}>
                    {itm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ overflow: "auto" }}>
              {records?.map((record, index) => {
                var data = [];
                for (var key in record) {
                  key == "id" ? data.push(index + 1) : data.push(record[key]);
                }
                return (
                  <tr key={index}>
                    {data.map((item) => {
                      return (
                        <td>
                          <a
                            href={url + record["id"]}
                            style={{ color: "#000" }}
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

export default ScrollableTable;
