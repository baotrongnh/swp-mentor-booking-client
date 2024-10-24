import { Button, Flex, Result } from "antd"
import { useNavigate } from "react-router-dom"

function PageNotFound() {
     const navigate = useNavigate()
     const handleBack = () => {
          navigate(-1)
     }
     return (
          <Flex style={{ height: '100vh', width: '100vw' }} justify="center" align="center">
               <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button onClick={handleBack} type="primary">Back</Button>}
               />
          </Flex>
     )
}

export default PageNotFound;