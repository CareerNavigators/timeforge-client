import { Table } from "ka-table";
import "ka-table/style.css";
import { DataType, PagingPosition, SortingMode } from "ka-table/enums";
import AxiosSecure from "../../../Hook/useAxios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Column, PagingOptions } from "ka-table/models";
import { useState } from "react";
import { AllItem, SingleItem } from "../AllTypes";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Switch,
  Upload,
  GetProp,
  UploadFile,
  UploadProps,
  Spin,
} from "antd";
import { TbBoxOff, TbBox } from "react-icons/tb";
import { PlusOutlined } from "@ant-design/icons";
import useCloudinary from "../../../Hook/useCloudinary";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const AllEcommerce = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>();
  const caxios = AxiosSecure();
  const uploadImage = useCloudinary();
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleItem, setSingleItem] = useState<SingleItem | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const handelPreviewCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handelModalOpen = () => {
    setIsModalOpen(true);
  };
  const handelModalClose = () => {
    setIsModalOpen(false);
    setFileList([]);
    setPreviewImage("");
    setPreviewTitle("");
  };
  const allEcommerce = useQuery({
    queryKey: ["allEcommerce"],
    queryFn: async () => {
      const res = await caxios.get(`/admin/ecommerce?page=${page}`);
      return res.data as AllItem;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });
  const mutationUpdateItem = useMutation({
    mutationFn: async (values: any) => {
      const res = await caxios.patch(`/ecommerce/${singleItem?._id}`, values);
      return res.data;
    },
    onSuccess: () => {
      allEcommerce.refetch();
      handelModalClose();
    },
  });
  const mutationAddItem = useMutation({
    mutationFn: async (values: any) => {
      const res = await caxios.post("/ecommerce", values);
      return res.data;
    },
    onSuccess: () => {
      allEcommerce.refetch();
      handelModalClose();
    },
  });
  const mutationDeleteItem=useMutation({
    mutationFn:async(id:string|undefined)=>{
        if (id) {
            const res=await caxios.delete(`/ecommerce/${id}`)
            return res.data
        }else{
            return true
        }
    },
    onSuccess:()=>{
        allEcommerce.refetch()
        handelModalClose();
    }
  })
  const handlePageChange = async (pageIndex: number) => {
    if (page !== pageIndex + 1) {
      await setPage(pageIndex + 1);
      allEcommerce.refetch();
    }
  };
  const childComponent = {
    pagingIndex: {
      content: ({
        pageIndex,
        isActive,
      }: {
        pageIndex: number;
        isActive: boolean;
      }) => {
        if (isActive) {
          handlePageChange(pageIndex);
        }
      },
    },
  };
  const paging: PagingOptions = {
    enabled: true,
    pagesCount: allEcommerce.data?.totalPages,
    pageSize: 15,
    position: PagingPosition.Top,
  };
  const columns = [
    {
      key: "title",
      title: "Title",
      dataType: DataType.String,
      isEditable: false,
    },
    {
      key: "img",
      title: "Image",
      isEditable: false,
    },
    {
      key: "price",
      title: "Price",
      DataType: DataType.Number,
      isEditable: false,
    },
    {
      key: "isSoldOut",
      title: "isSoldOut",
    },
    {
      key: "action",
      title: "Action",
      isEditable: false,
    },
  ];
  function handelActionClick(rowData: SingleItem) {
    if (!isCreate) {
      setFileList([
        {
          uid: "-1",
          status: "done",
          url: rowData.img,
          name: "default",
        },
      ]);
      setSingleItem(rowData);
    } else {
      setFileList([]);
      setPreviewImage("");
      setPreviewTitle("");
    }
    handelModalOpen();
  }
  const format = ({
    column,
    rowData,
  }: {
    column: Column;
    rowData: SingleItem;
  }) => {
    if (column.key == "img") {
      return (
        <Image
          src={rowData.img}
          height={150}
          fallback="data:image/png;base64,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"
        />
      );
    } else if (column.key == "action") {
      return (
        <Button
          onClick={() => {
            setIsCreate(false);
            handelActionClick(rowData);
          }}
        >
          See More
        </Button>
      );
    } else if (column.key == "isSoldOut") {
      return rowData.isSoldOut ? (
        <TbBoxOff className="text-3xl text-red-500" />
      ) : (
        <TbBox className="text-3xl" />
      );
    }
  };

  async function FormOnFinish(values: any) {
    if (typeof values.img != "string") {
      values.img = await uploadImage(values.img.file);
    }
    if (isCreate) {
      await mutationAddItem.mutateAsync(values);
    } else {
      await mutationUpdateItem.mutateAsync(values);
    }
  }

  const uploadButton = (
    <Button
      style={{ border: 0, background: "none" }}
      htmlType="button"
      onClick={() => {
        setIsCreate(true);
        handelModalOpen();
      }}
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </Button>
  );
  return (
    <div>
     <div className="flex justify-center my-4">
     <Button
        className="bg-blue-500 w-32 text-white font-semibold"
        onClick={() => {
          setIsCreate(true);
          handelActionClick({
            title: "",
            img: "",
            isSoldOut: false,
            price: 0,
          });
        }}
      >
        Add Item
      </Button>
     </div>
      <Table
        noData={{
          text: "No Item Found",
        }}
        loading={{
          enabled: allEcommerce.isLoading || allEcommerce.isRefetching,
          text: "Loading...",
        }}
        // @ts-expect-error noidea
        format={format}
        columns={columns}
        paging={paging}
        data={allEcommerce.data?.docs}
        rowKeyField={"_id"}
        childComponents={childComponent}
        sortingMode={SortingMode.Single}
      />
      <div>
        <Modal
          width={1000}
          destroyOnClose={true}
          onCancel={handelModalClose}
          footer={null}
          open={isModalOpen}
        >
          <Form layout="vertical" onFinish={FormOnFinish}>
            <Form.Item
              label="Title"
              name="title"
              initialValue={isCreate ? "" : singleItem?.title}
              rules={[{ required: true }]}
              validateTrigger="onBlur"
            >
              <Input defaultValue={isCreate ? "" : singleItem?.title} />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              initialValue={isCreate ? "" : singleItem?.price}
              rules={[{ required: true }]}
            >
              <InputNumber defaultValue={isCreate ? "" : singleItem?.price} />
            </Form.Item>
            <Form.Item
              label="isSoldOut"
              name="isSoldOut"
              initialValue={isCreate ? false : singleItem?.isSoldOut}
              rules={[{ required: true }]}
            >
              <Switch
                className="bg-gray-600"
                defaultChecked={isCreate ? false : singleItem?.isSoldOut}
                checkedChildren={<span>True</span>}
                unCheckedChildren={<span>False</span>}
              />
            </Form.Item>
            <Modal
              width={500}
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handelPreviewCancel}
            >
              <img
                alt={previewTitle}
                style={{ width: "100%" }}
                src={previewImage}
              />
            </Modal>
            <Form.Item
              label="Product Image"
              name="img"
              initialValue={isCreate ? "" : singleItem?.img}
              rules={[{ required: true }]}
            >
              <Upload
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={1}
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleChange}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            <div className="flex gap-2">
              {mutationAddItem.isPending || mutationUpdateItem.isPending ||mutationDeleteItem.isPending ? (
                <div className="flex justify-center">
                  <Spin size="large"></Spin>
                </div>
              ) : (
                <>
                  <Button htmlType="submit" className="bg-yellow-200">
                    {isCreate ? "Add" : "Update"}
                  </Button>
                  <Button className="bg-red-500 text-white" onClick={()=>{mutationDeleteItem.mutate(singleItem?._id)}}>Delete</Button>
                </>
              )}
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AllEcommerce;
