import React from 'react';
import { Modal ,Card} from 'antd';
import {connect } from 'react-redux'

const FullSizeWeather = (props) => {
    const { weather, visible, setvisible } = props
    const handleOk =  () =>{
    
    }
    const handleCancel =  () =>{
        setvisible(false)
    }
    return (
        <Modal
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            title="Weather"
        >
            <Card>
                aaaaaaaaaaaaaaaaaa
                 {/* {weather} */}
            </Card>
    </Modal>
)
}
const state = ({ weather}) =>{
return weather
}
export default connect(state)(FullSizeWeather)