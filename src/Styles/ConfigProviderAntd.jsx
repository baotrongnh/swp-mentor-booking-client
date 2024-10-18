import { ConfigProvider, theme as themeAntd } from "antd"
import propTypes from 'prop-types'
import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import './GlobalStyles.scss'

function ConfigProviderAntd({ children }) {
     const { theme } = useContext(AppContext)
     const { darkAlgorithm } = themeAntd
     
     return (
          <ConfigProvider theme={{
               token: {
                    fontFamily: 'Segoe UI, Arial, sans-serif',
                    fontSize: 16,
                    colorPrimary: '#0084ff',
               },
               components: {
                    Dropdown: {
                         paddingBlock: 10
                    },
               },
               algorithm: theme === 'dark-theme' ? [darkAlgorithm] : undefined,
          }}>
               {children}
          </ConfigProvider>

     )
}

export default ConfigProviderAntd

ConfigProviderAntd.propTypes = {
     children: propTypes.any
}