/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, InputNumber, notification } from "antd";
import {SmileOutlined, WarningOutlined} from "@ant-design/icons";
import { useEffect, useRef } from "react";

const CATEGORIES = ["Action", "Science Fiction", "Drama", "Thriller", "Horror", "Comedy"];

function AddNew({isModalOpen, setIsModalOpen, url}) {

    const [form] = Form.useForm();

    const useFirstRender = () => {
        const firstRender = useRef(true);
      
        useEffect(() => {
          firstRender.current = false;
        }, []);
      
        return firstRender.current;
    }

    const firstRender = useFirstRender();

    const handleOk = () => {
        form
          .validateFields()
          .then((values) => {
              setIsModalOpen(false);
              form.resetFields();
              onCreate(values);
          })
          .catch((info) => {
              console.log("Validation Failed:", info.errorFields[0].errors);
          });
    } 
        
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    }

    const showToast = (msg, description, icon) => {
        if(!firstRender){
            notification.open({
                message: msg,
                description: description,
                icon: (icon)
            });
        }
    }

    const onCreate = async (values) => {
        try {
          const response = await fetch(url, {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json',
              }
          })
          console.log(response.status);
          if(response.status > 199 && response.status < 300) {
            showToast("Good news!", "Your movie was added succesfully", <SmileOutlined/>);
          }
          else {
            showToast("Bad news!", "There was a problem with your request", <WarningOutlined />);
          }
        } 
        
        catch(e) {
            console.log(e.message);
            showToast("Bad", e.message, <WarningOutlined />);
        }
    }

    const handleYearValidation = (_, value) => {
        if (value && value < 1888) {
            return Promise.reject(new Error('Release year must be above 1888'));
        } 
        else if (value && value > 2024) {
            return Promise.reject(new Error('Release year must be below 2024'));
        }
        return Promise.resolve();
    }

    return(

    <Modal title="Add New" open={isModalOpen} onOk={handleOk} okText="Save" onCancel={handleCancel}>
        <Form form={form}
          name="addNew"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[
                  {max:51, message: 'Title must be shorter than 50 chars'},
                  { required: true, message: 'Please input a title' }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Release Date"
                name="releaseYear"
                rules={[
                  { required: true, message: 'Please input a release year' },
                  {validator: handleYearValidation}
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item label="Select Category" name="category" 
            rules={[{required: true, message: 'Please select a category' }]}
            >
              <Select>
                {CATEGORIES.map((category)=>
                  <Select.Option key={category} value={category}>{category}</Select.Option>
                )}
              </Select>
            </Form.Item>

        </Form>
    </Modal>
    )
}

export default AddNew;