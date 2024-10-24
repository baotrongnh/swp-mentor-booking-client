import { Button, Result } from 'antd'
import PropTypes from 'prop-types'

export default function PageError({ action }) {
     return (
          <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <Result
                    status="warning"
                    title="There are some problems with your operation."
                    extra={
                         <Button type="primary" key="console" onClick={action}>
                              Try again
                         </Button>
                    }
               />
          </div>
     )
}

PageError.propTypes = {
     action: PropTypes.func
}
