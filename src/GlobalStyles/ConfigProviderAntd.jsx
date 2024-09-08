import { ConfigProvider } from "antd";
import './GlobalStyles.scss';
import propTypes from 'prop-types';

function ConfigProviderAntd({ children }) {
     return (
          <ConfigProvider theme={{
               token: {
                    fontFamily: 'Segoe UI, Arial, sans-serif'
               }
          }}>
               {children}
          </ConfigProvider>

     );
}

export default ConfigProviderAntd;

ConfigProviderAntd.propTypes = {
     children: propTypes.any
}