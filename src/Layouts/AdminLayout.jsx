import { Col, Row } from "antd";
import { SidebarAdmin } from "../Components";
import { PropTypes } from "prop-types";

function AdminLayout({ children }) {
     return (
          <Row>
               <Col flex='300px'>
                    <SidebarAdmin />
               </Col>

               <Col flex='auto'>
                    {children}
               </Col>
          </Row>
     );
}

export default AdminLayout;

AdminLayout.propTypes = {
     children: PropTypes.any
}