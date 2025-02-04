/* eslint-disable react/prop-types */
import { DeleteFilled, EditOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import inventoryData from "../data/inventoryData";

const InventoryManagement = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState({ isOpen: false });
  const [modalEdit, setModalEdit] = useState({ isOpen: false, data: null });

  const columns = [
    {
      title: "Item Name",
      dataIndex: "item",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
    },
    {
      title: "Unit of Measurement (UoM)",
      dataIndex: "uom",
    },
    {
      title: "Price per Quantity",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (val) => (
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="outlined"
            className="text-blue-600"
            onClick={() => setModalEdit({ isOpen: true, data: val })}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={() => handleDelete(val.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "text-white bg-blue-600" }}
          >
            <Button color="danger" variant="outlined" className="text-red-600">
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    setData((prev) => prev.filter((f) => f.id !== id));
  };

  useEffect(() => {
    setData(inventoryData);
  }, []);

  const filterData = useMemo(() => {
    if (search) {
      return data.filter((f) => f.item.toLocaleLowerCase().includes(search));
    } else {
      return data;
    }
  }, [data, search]);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-semibold">Inventory Management</h1>
      <div className="flex gap-3 justify-between">
        <Input
          placeholder="Search item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
          className="mt-4"
          suffix={<SearchOutlined />}
        />

        <Button
          color="primary"
          variant="solid"
          className="bg-blue-600"
          onClick={() => setModalAdd({ isOpen: true })}
        >
          Add Item
        </Button>
      </div>
      <Table
        className="mt-4"
        columns={columns}
        dataSource={filterData}
        rowKey={"id"}
        pagination={{ pageSize: 5 }}
      />
      <ModalAddItem
        isOpen={modalAdd.isOpen}
        handleClose={() => setModalAdd({ isOpen: false })}
        handleSubmit={(val) => {
          setData((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              ...val,
            },
          ]);
          setModalAdd({ isOpen: false });
        }}
      />
      {modalEdit.data && (
        <ModalEditItem
          isOpen={modalEdit.isOpen}
          data={modalEdit.data}
          handleClose={() => setModalEdit({ isOpen: false, data: null })}
          handleSubmit={(val) => {
            let temp = [...data];
            const fIdx = temp.findIndex((f) => f.id === val.id);
            temp[fIdx] = val;
            setData(temp);
            setModalEdit({ isOpen: false, data: null });
          }}
        />
      )}
    </div>
  );
};

export default InventoryManagement;

const ModalAddItem = ({ isOpen, handleClose, handleSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

  return (
    <Modal title="Add Item" open={isOpen} onCancel={handleClose} footer={false}>
      <Form
        form={form}
        className="mt-4"
        name="basic"
        initialValues={{
          item: "",
          qty: "",
          uom: "",
          price: "",
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="item"
          label="Item Name"
          rules={[
            {
              required: true,
              message: "Please input item name",
            },
          ]}
        >
          <Input placeholder="Input item name" />
        </Form.Item>
        <Form.Item
          name="qty"
          label="Quantity"
          rules={[
            {
              required: true,
              message: "Please input quantity with type number",
              type: "number",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Input quantity"
          />
        </Form.Item>
        <Form.Item
          name="uom"
          label="Uom Name"
          rules={[
            {
              required: true,
              message: "Please input Uom",
            },
          ]}
        >
          <Input placeholder="Input Uom" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price per quantity"
          rules={[
            {
              required: true,
              message: "Please input price with type number",
              type: "number",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Input price"
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            className="bg-blue-600 w-full"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalEditItem = ({ isOpen, handleClose, handleSubmit, data }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

  const handleHideModal = () => {
    handleClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Edit Item"
      open={isOpen}
      onCancel={handleHideModal}
      footer={false}
    >
      <Form
        form={form}
        className="mt-4"
        name="basic"
        initialValues={{
          id: data?.id ?? "",
          item: data?.item ?? "",
          qty: data?.qty ?? "",
          uom: data?.uom ?? "",
          price: data?.price ?? "",
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="id"
          className="hidden"
          rules={[
            {
              required: true,
              message: "Please input item name",
            },
          ]}
        >
          <Input placeholder="Input item name" />
        </Form.Item>
        <Form.Item
          name="item"
          label="Item Name"
          rules={[
            {
              required: true,
              message: "Please input item name",
            },
          ]}
        >
          <Input placeholder="Input item name" />
        </Form.Item>
        <Form.Item
          name="qty"
          label="Quantity"
          rules={[
            {
              required: true,
              message: "Please input quantity with type number",
              type: "number",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Input quantity"
          />
        </Form.Item>
        <Form.Item
          name="uom"
          label="Uom Name"
          rules={[
            {
              required: true,
              message: "Please input Uom",
            },
          ]}
        >
          <Input placeholder="Input Uom" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price per quantity"
          rules={[
            {
              required: true,
              message: "Please input price with type number",
              type: "number",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Input price"
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            className="bg-blue-600 w-full"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
