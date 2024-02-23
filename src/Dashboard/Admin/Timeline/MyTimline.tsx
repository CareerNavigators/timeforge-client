import { Table } from "ka-table";
import "ka-table/style.css";
import {
  DataType,
  EditingMode,
  PagingPosition,
  SortingMode,
} from "ka-table/enums";
import { Column, PagingOptions } from "ka-table/models";
import AxiosSecure from "../../../Hook/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRef, useState } from "react";
import { SingleTimeLine, TimelineType, TimelineItem } from "../AllTypes";
import { FormatFunc } from "ka-table/types";
import {
  Button,
  Input,
  Modal,
  Spin,
  TimePicker,
  Timeline,
  Tooltip,
} from "antd";
const MyTimline = () => {
  const caxios = AxiosSecure();
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [twoTime, setTwoTime] = useState(null);
  const [content, setContent] = useState("");

  const selectedTimeline = useMutation({
    mutationFn: async (id: string) => {
      const res = await caxios.get(`/timeline?type=single&id=${id}`);
      return res.data as SingleTimeLine;
    },
  });
  const allTimeline = useQuery({
    queryKey: ["allTimeline"],
    queryFn: async () => {
      const res = await caxios(`/admin/timeline?page=${page}`);
      return res.data as TimelineType;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });
  const paging: PagingOptions = {
    enabled: true,
    pagesCount: allTimeline.data?.totalPages,
    pageSize: 15,
    position: PagingPosition.Top,
  };
  const columns: Column[] = [
    {
      key: "event",
      title: "Event",
      isEditable: false,
    },
    {
      key: "createdAt",
      title: "Created At",
      dataType: DataType.String,
      isEditable: false,
    },
    {
      key: "action",
      title: "Action",
      isEditable: false,
    },
  ];
  const handlePageChange = async (pageIndex: number) => {
    if (page !== pageIndex + 1) {
      await setPage(pageIndex + 1);
      allTimeline.refetch();
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
  const showModal = async (id: string) => {
    handelOpen();
    await selectedTimeline.mutateAsync(id);
  };
  const format: FormatFunc = ({ column, rowData }): any => {
    if (column.key == "createdAt") {
      return moment(rowData.createdAt).format("MMM Do YY, h:mm a").toString();
    } else if (column.key == "event") {
      return <span>{rowData.event?.title}</span>;
    } else if (column.key == "action") {
      return (
        <Button
          className="bg-[#1677ff] text-white"
          onClick={() => {
            showModal(rowData._id);
          }}
        >
          See More{" "}
        </Button>
      );
    }
  };
  const handelOpen = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateTimeline = useMutation({
    mutationFn: async (data: TimelineItem) => {
      const res = await caxios.patch(
        `/timeline/${selectedTimeline.data?._id}?type=add`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      if (selectedTimeline.data?._id) {
        selectedTimeline.mutate(selectedTimeline.data?._id);
      }
    },
  });
  async function onsubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const time = formdata.getAll("time");

    const data: TimelineItem = {
      startTime: String(time[0]),
      endTime: String(time[1]),
      content: String(formdata.get("content")),
    };
    await updateTimeline.mutateAsync(data);
    setTwoTime(null);
    setContent("")
  }

  return (
    <div>
      <Table
        noData={{
          text: "No Meetings Found",
        }}
        loading={{
          enabled: allTimeline.isLoading || allTimeline.isRefetching,
          text: "Loading...",
        }}
        format={format}
        columns={columns}
        paging={paging}
        data={allTimeline.data?.docs}
        editingMode={EditingMode.Cell}
        rowKeyField={"_id"}
        sortingMode={SortingMode.Single}
        childComponents={childComponent}
      />
      <Modal
        width={800}
        title="Timeline Modal"
        confirmLoading={allTimeline.isLoading || allTimeline.isRefetching}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
        open={isModalOpen}
      >
        {selectedTimeline.isPending ? (
          <div className="flex justify-center">
            <Spin size="large"></Spin>{" "}
          </div>
        ) : selectedTimeline.isSuccess ? (
          selectedTimeline.data.timeline.length != 0 ? (
            <Timeline
              mode="alternate"
              items={selectedTimeline.data.timeline.map((x) => {
                return {
                  label: (
                    <p className="font-semibold">{`${x.startTime}-${x.endTime}`}</p>
                  ),
                  children: (
                    <Tooltip trigger="click" title={x._id}>
                      {x.content}
                    </Tooltip>
                  ),
                };
              })}
            ></Timeline>
          ) : (
            <p className="text-gray-600 text-center font-semibold">
              No Timeline added
            </p>
          )
        ) : (
          <p className="text-center text-lg text-red-500 font-semibold">
            Something Error
          </p>
        )}
        <form onSubmit={onsubmit} className="flex flex-col gap-1">
          <p className="font-bold">Pick Range</p>
          <TimePicker.RangePicker
            name="time"
            use12Hours
            format="h:mm a"
            required
            value={twoTime}
            onChange={(v) => {
              // @ts-expect-error noidea
              setTwoTime(v);
            }}
          ></TimePicker.RangePicker>
          <p>Description</p>

          <Input.TextArea
            required
            name="content"
            value={content}
            onChange={(v) => {
              // @ts-expect-error noidea
              setContent(v);
            }}
            rows={3}
          />
          {updateTimeline.isPending ? (
            <div className="flex justify-center">
              <Spin size="large"></Spin>{" "}
            </div>
          ) : (
            <Button className="bg-orange-200 font-semibold" htmlType="submit">
              Add
            </Button>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default MyTimline;
