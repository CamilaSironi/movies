/* eslint-disable react/prop-types */
import {Modal,Rate} from 'antd';
import { useState } from 'react';

function RateModal ({isRateModalOpen, setIsRateModalOpen, id}) {
    let URL = `http://127.0.0.1:3000/api/v1/movies/${id}/ratings`;

    const [value, setValue] = useState(0);

    const handleOk = () => {
        setIsRateModalOpen(false);
        onCreate(value);
    } 
        
    const handleCancel = () => {
        setIsRateModalOpen(false);
    };

    const onCreate = async (value) => {
        try {
            const json = {
                "value": value
            }
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {
                  'Content-Type': 'application/json',
                  }
            })
            console.log(response.status);
      
        } catch(e) {
            console.log(e.message);
        }
    }


return (
    <Modal title="Rate" open={isRateModalOpen} onOk={handleOk} okText="Save" onCancel={handleCancel}>
        <Rate allowHalf defaultValue={1} onChange={setValue} value={value}>

        </Rate>
    </Modal>
)
}

export default RateModal;