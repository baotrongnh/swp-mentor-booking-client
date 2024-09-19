import propTypes from 'prop-types';

function DefaultLayout({ children }) {
     return (
          children
     )
}

export default DefaultLayout;

DefaultLayout.propTypes = {
     children: propTypes.any
}

