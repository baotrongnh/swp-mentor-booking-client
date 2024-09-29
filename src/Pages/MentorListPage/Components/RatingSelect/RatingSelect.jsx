import { Checkbox, Rate } from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../../Contexts/AppContext";

function RatingSelect() {
     const { filterMentor, setFilterMentor } = useContext(AppContext);

     const handleChange = (e) => {
          if (e.target.checked) {
               setFilterMentor({ ...filterMentor, star: e.target.id });
          }
     }

     useEffect(() => {
          return () => {
               setFilterMentor({ ...filterMentor, star: '' });
          }
     }, []);

     const stars = [5, 4, 3, 2, 1];

     return (
          <div className="rating-select" style={{ marginTop: '10px' }}>
               <h1 className="title-filter-rating" style={{ margin: '20px 0', fontSize: '2.2rem', fontWeight: '500' }}>Rating</h1>

               {stars.map((star) => (
                    <div key={star} className="block-star">
                         <Checkbox checked={filterMentor.star == star} onClick={e => handleChange(e)} id={star} />
                         <Rate style={{ marginLeft: '10px' }} disabled defaultValue={star} />
                    </div>
               ))}

          </div>
     );
}

export default RatingSelect;

RatingSelect.propTypes = {
     star: PropTypes.number
}