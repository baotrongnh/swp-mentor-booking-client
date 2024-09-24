import { Checkbox, Rate } from "antd";
import PropTypes from "prop-types";

function RatingSelect() {
     const handleChange = (e) => {
          if (e.target.checked) {
               console.log(e.target.id);
          }
     }
     return (
          <div className="rating-select" style={{ marginTop: '10px' }}>
               <h1 className="title-filter-rating" style={{ margin: '20px 0', fontSize: '2.2rem', fontWeight: '500' }}>Rating</h1>
               <div className="block-star">
                    <Checkbox onClick={e => handleChange(e)} id={5} />
                    <Rate style={{ marginLeft: '10px' }} disabled defaultValue={5} />
               </div>

               <div className="block-star">
                    <Checkbox onClick={e => handleChange(e)} id={4} />
                    <Rate style={{ marginLeft: '10px' }} disabled defaultValue={4} />
               </div>

               <div className="block-star">
                    <Checkbox onClick={e => handleChange(e)} id={3} />
                    <Rate style={{ marginLeft: '10px' }} disabled defaultValue={3} />
               </div>

               <div className="block-star">
                    <Checkbox onClick={e => handleChange(e)} id={2} />
                    <Rate style={{ marginLeft: '10px' }} disabled defaultValue={2} />
               </div>

               <div className="block-star">
                    <Checkbox onClick={e => handleChange(e)} id={1} />
                    <Rate style={{ marginLeft: '10px' }} disabled defaultValue={1} />
               </div>
          </div>
     );
}

export default RatingSelect;

RatingSelect.propTypes = {
     star: PropTypes.number
}