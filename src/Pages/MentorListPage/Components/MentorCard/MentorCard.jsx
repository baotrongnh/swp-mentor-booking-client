import { Col, Row } from "antd";
import PropTypes from "prop-types";
import './MentorCard.scss';

function MentorCard({avatar, name, rating, description, skills}) {
     return (
          <div className="mentor-card">
               <Row className="infor-block">
                    <Col md={5} className="avatar-block">
                         <img className="avatar-img" src={avatar} alt="" />
                    </Col>

                    <Col md={19} className="text-block">
                         <h1 className="name">{name}</h1>

                    </Col>
               </Row>
          </div>
     );
}

export default MentorCard;

MentorCard.propTypes = {
     avatar: PropTypes.string,
     name: PropTypes.string
}