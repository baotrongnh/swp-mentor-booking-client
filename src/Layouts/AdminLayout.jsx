import { Col, Row } from "antd"
import { PropTypes } from "prop-types"
import { SidebarAdmin } from "../Components"

function AdminLayout({ children }) {

     return (
          <Row wrap={false}>
               <Col xs={0} md={7} lg={6} xl={5} xxl={3}>
                    <SidebarAdmin />
               </Col>

               <Col xs={24} md={17} lg={18} xl={19} xxl={21}>
                    {/* <HeaderAdmin /> */}
                    {children}
               </Col>
          </Row>
     )
}

export default AdminLayout

AdminLayout.propTypes = {
     children: PropTypes.any
}