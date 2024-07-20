/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select, InputNumber, notification } from "antd";

const CATEGORIES = ["Action", "Science Fiction", "Drama", "Thriller", "Horror", "Comedy"];

function AddNew({isModalOpen, setIsModalOpen, url}) {

    const [form] = Form.useForm();

    const handleOk = () => {
        setIsModalOpen(false);

        form
          .validateFields()
          .then((values) => {
              form.resetFields();
              console.log(values);
              onCreate(values);
          })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    } 
        
    const handleCancel = () => {
      setIsModalOpen(false);
    };

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

        } catch(e) {
            console.log(e.message);
            openNotificationWithIcon();
        }
    }

    const openNotificationWithIcon = () => {
      notification.error(
        {message: 'Error',
        description: 'An error occurred while processing your request.',
        placement: 'bottomRight'
      })
        
    };

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