import { Table } from "ka-table";
import "ka-table/style.css";
import {
  DataType,
  EditingMode,
  PagingPosition,
  SortingMode,
} from "ka-table/enums";
import { Column, PagingOptions } from "ka-table/models";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { SingleTimeLine, TimelineType, TimelineItem } from "./TimelineTS";
import { FormatFunc } from "ka-table/types";
import { Button, Input, Modal, Spin, TimePicker, Timeline } from "antd";
import AxiosSecure from "../../Hook/useAxios";
import showToast from "../../Hook/swalToast";
import { AuthContext } from "../../Provider/AuthContext";
import "./Timeline.css";

const AllTimeline = () => {
  const { userData } = useContext(AuthContext);
  const caxios = AxiosSecure();
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [twoTime, setTwoTime] = useState(null);
  const [content, setContent] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<TimelineItem | undefined>();
  const handelOpen = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handelOpen2 = (id: string | undefined) => {
    if (selectedTimeline.data?.timeline) {
      setSelectedSlot(
        selectedTimeline.data?.timeline.filter((x) => x._id == id)[0]
      );
      setIsModalOpen2(true);
    }
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
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
  const contentMutation = useMutation({
    mutationFn: async function (data: any) {
      const result = await caxios.patch(
        `/timeline/${selectedTimeline.data?._id}?type=content`,
        data
      );
      return result.data;
    },
    onSuccess: () => {
      if (selectedTimeline.data?._id) {
        selectedTimeline.mutate(selectedTimeline.data?._id);
        showToast("success", `Content updated`);
      }
      handleCancel2();
    },
  });
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
  const resetMutation = useMutation({
    mutationFn: async () => {
      const result = await caxios.delete(
        `/timeline/${selectedTimeline?.data?._id}`
      );
      return result.data;
    },
    onSuccess: () => {
      handleCancel2();
      handleCancel();
      showToast("success", "Timeline Reset");
    },
    onError: () => {
      handleCancel2();
      handleCancel();
      showToast("error", "Reset Failed");
    },
  });
  const paging: PagingOptions = {
    enabled: true,
    pagesCount: allTimeline.data?.totalPages,
    pageSize: 15,
    position: PagingPosition.Bottom,
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
      return moment(rowData.createdAt).format("MMM Do YY, h:mm a");
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

  async function onsubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.getAll("time");

    const data: TimelineItem = {
      startTime: String(time[0]),
      endTime: String(time[1]),
      content: String(formData.get("content")),
    };
    console.log();
    if (
      moment(data.startTime, "hh:mm a").isSameOrAfter(
        moment(selectedTimeline.data?.event.startTime, "hh:mm a")
      ) &&
      moment(data.startTime, "hh:mm a").isSameOrBefore(
        moment(selectedTimeline.data?.event.endTime, "hh:mm a")
      )
    ) {
      if (
        moment(data.endTime, "hh:mm a").isSameOrAfter(
          moment(selectedTimeline.data?.event.startTime, "hh:mm a")
        ) &&
        moment(data.endTime, "hh:mm a").isSameOrBefore(
          moment(selectedTimeline.data?.event.endTime, "hh:mm a")
        )
      ) {
        let error = false;
        selectedTimeline.data?.timeline.forEach((x) => {
          if (x.startTime == data.startTime) {
            showToast("error", "This start-time already exist");
            error = true;
            return;
          } else if (x.endTime == data.endTime) {
            showToast("error", "This end-time already exist");
            error = true;
            return;
          }
        });
        if (!error) {
          await updateTimeline.mutateAsync(data);
        }
      } else {
        showToast(
          "error",
          "This End-time should be lower then event's End-time and bigger then event's Start-time"
        );
      }
    } else {
      showToast(
        "error",
        "This Start-time should be bigger then event's Start-time and lower then event's Start-time"
      );
    }
    console.log();
    setTwoTime(null);
    setContent("");
  }

  function handelContentUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    contentMutation.mutateAsync({
      id: selectedSlot?._id,
      content: String(formData.get("content")),
    });
  }

  return (
    <div
      className="mx-auto max-w-6xl overflow-auto scroll-smooth p-5"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h2 className="text-center my-5 text-lg font-medium">
        Timeline's of
        <span className="text-[#7c3aed] ml-1 font-semibold">
          {userData && userData?.name}
        </span>
      </h2>
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
          <>
            <p className="italic">
              {moment(selectedTimeline.data.createdAt).format(
                "MMM Do YY, h:mm a"
              )}
            </p>

            {selectedTimeline.data.timeline.length != 0 ? (
              <>
                <p className=" text-red-500 italic text-right">
                  *Click each item for delete or edit
                </p>

                <Timeline
                  mode="alternate"
                  items={selectedTimeline.data?.timeline
                    .sort((a, b) => {
                      return moment(a.startTime, "h:mm a").isBefore(
                        moment(b.startTime, "h:mm a")
                      )
                        ? -1
                        : 1;
                    })
                    .map((x) => {
                      return {
                        label: (
                          <p
                            className="font-semibold cursor-pointer"
                            onClick={() => handelOpen2(x._id)}
                          >{`${x.startTime}-${x.endTime}`}</p>
                        ),
                        children: (
                          <p
                            className="cursor-pointer"
                            onClick={() => handelOpen2(x._id)}
                          >
                            {" "}
                            {x.content}
                          </p>
                        ),
                      };
                    })}
                ></Timeline>
              </>
            ) : (
              <p className="text-gray-600 text-center font-semibold">
                No Timeline added
              </p>
            )}
            <p className="text-center font-semibold">{`${selectedTimeline.data.event.startTime}-${selectedTimeline.data.event.endTime}`}</p>
          </>
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
          <p className="font-bold">Description</p>

          <Input.TextArea
            required
            name="content"
            value={content}
            onChange={(v) => {
              setContent(v.currentTarget.value);
            }}
            rows={3}
          />
          {updateTimeline.isPending ? (
            <div className="flex justify-center">
              <Spin size="large"></Spin>{" "}
            </div>
          ) : (
            <>
              {resetMutation.isPending || updateTimeline.isPending ? (
                <div className="flex justify-center">
                  <Spin size="large"></Spin>
                </div>
              ) : (
                <div className=" flex gap-2">
                  <Button
                    id="btn-submit"
                    className="bg-orange-200 font-semibold flex-1"
                    htmlType="submit"
                  >
                    Add
                  </Button>
                  <Button
                    id="btn-reset"
                    className="bg-red-200 font-semibold flex-1"
                    onClick={() => {
                      resetMutation.mutate();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </>
          )}
        </form>
      </Modal>
      <Modal
        width={500}
        title="Time Modal"
        destroyOnClose={true}
        onCancel={handleCancel2}
        footer={null}
        open={isModalOpen2}
      >
        <form onSubmit={handelContentUpdate} className="flex flex-col gap-1">
          <p className="font-semibold">{`${selectedSlot?.startTime}-${selectedSlot?.endTime}`}</p>
          <p className="font-bold">Content</p>
          <Input.TextArea name="content" defaultValue={selectedSlot?.content} />
          {contentMutation.isPending ? (
            <div className="flex justify-center">
              <Spin size="large"></Spin>
            </div>
          ) : (
            <>
              <Button htmlType="submit">Update Content</Button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default AllTimeline;
