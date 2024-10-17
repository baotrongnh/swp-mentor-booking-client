import { ConfigProvider } from "antd";
import './GlobalStyles.scss';
import propTypes from 'prop-types';
import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

function ConfigProviderAntd({ children }) {
     const { theme } = useContext(AppContext);
     console.log(theme);
     return (
          <ConfigProvider theme={{
               token: {
                    fontFamily: 'Segoe UI, Arial, sans-serif',
                    fontSize: 16,
                    // colorPrimary: '#00DD73',
                    colorTextBase: theme === 'light-theme' ? '#333' : '#fff',
                    
               },
               components: {
                    Dropdown: {
                         paddingBlock: 10
                    },
               },
          }}>
               {children}
          </ConfigProvider>

     )
}

export default ConfigProviderAntd;

ConfigProviderAntd.propTypes = {
     children: propTypes.any
}