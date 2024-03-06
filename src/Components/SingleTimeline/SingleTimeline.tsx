import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios"
import { Button, Divider, Input, Modal, Spin, TimePicker, Timeline } from "antd";
import Guest from "../Guest/Guest";
import moment from "moment";
import { TimelineItem } from "../Timeline/TimelineTS";
import showToast from "../../Hook/swalToast";
import { useState } from "react";

const SingleTimeline = ({ eventId }: { eventId: string | undefined }) => {
    // states and hooks
    const customAxios = useAxios()
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [twoTime, setTwoTime] = useState(null);
    const [content, setContent] = useState("");
    const [selectedSlot, setSelectedSlot] = useState<TimelineItem | undefined>();

    //fetching timeline from mongoose
    const {
        data: eventTimeline,
        isPending,
        isSuccess,
        refetch
    } = useQuery({
        queryKey: ["TimelineDetails", eventId],
        queryFn: async () => {
            const res = await customAxios.get(`/timeline?type=event&id=${eventId}`);
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    console.log("event timeline", eventTimeline);

    const handelOpen2 = (id: string | undefined) => {
        if (eventTimeline?.timeline) {
            setSelectedSlot(
                eventTimeline?.timeline.filter((x: TimelineItem) => x._id == id)[0]
            );
            setIsModalOpen2(true);
        }
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const contentMutation = useMutation({
        mutationFn: async function (data: any) {
            const result = await customAxios.patch(
                `/timeline/${eventTimeline?._id}?type=content`,
                data
            ); // sending timeline id with updated content here
            return result.data;
        },
        onSuccess: () => {
            if (eventTimeline?._id) {
                refetch();
            }
            handleCancel2();
        },
    });
    const updateTimeline = useMutation({
        mutationFn: async (data: TimelineItem) => {
            const res = await customAxios.patch(
                `/timeline/${eventTimeline?._id}?type=add`,
                data
            );
            return res.data;
        },
        onSuccess: () => {
            if (eventTimeline?._id) {
                refetch();
            }
        },
    });
    const resetMutation = useMutation({
        mutationFn: async () => {
            const result = await customAxios.delete(
                `/timeline/${eventTimeline?._id}`
            );
            return result.data;
        },
        onSuccess: () => {
            handleCancel2();
            showToast("success", "Timeline Reset");
        },
        onError: () => {
            handleCancel2();
            showToast("error", "Reset Failed");
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
        console.log();
        if (
            moment(data.startTime, "hh:mm a").isSameOrAfter(
                moment(eventTimeline?.event.startTime, "hh:mm a")
            ) &&
            moment(data.startTime, "hh:mm a").isSameOrBefore(
                moment(eventTimeline?.event.endTime, "hh:mm a")
            )
        ) {
            if (
                moment(data.endTime, "hh:mm a").isSameOrAfter(
                    moment(eventTimeline?.event.startTime, "hh:mm a")
                ) &&
                moment(data.endTime, "hh:mm a").isSameOrBefore(
                    moment(eventTimeline?.event.endTime, "hh:mm a")
                )
            ) {
                let error = false
                eventTimeline?.timeline.forEach((x: TimelineItem) => {
                    if (x.startTime == data.startTime) {
                        showToast("error", "This startTime already exist")
                        error = true
                        return
                    } else if (x.endTime == data.endTime) {
                        showToast("error", "This endtime already exist")
                        error = true
                        return
                    }
                })
                if (!error) {
                    await updateTimeline.mutateAsync(data);
                }
            } else {
                showToast("error", "This Endtime should be lower then event's endtime and bigger then event's starttime")
            }
        } else {
            showToast("error", "This Starttime should be bigger then event's starttime and lower then event's starttime")
        }
        console.log();
        setTwoTime(null);
        setContent("");
    }

    function handelContentUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        contentMutation.mutateAsync({
            id: selectedSlot?._id,
            content: String(formdata.get("content")),
        });
    }





    return (
        <div>
            <div>
                {isPending ? (
                    <div className="flex justify-center">
                        <Spin size="large"></Spin>{" "}
                    </div>
                ) : isSuccess ? (
                    <>
                        <p className="italic">
                            {moment(eventTimeline?.createdAt).format(
                                "MMM Do YY, h:mm a"
                            )}
                        </p>

                        {eventTimeline?.timeline.length != 0 ? (
                            <>
                                <p className=" text-red-500 italic text-right">
                                    *Click each item for delete or edit
                                </p>

                                <Timeline
                                    mode="alternate"
                                    items={eventTimeline?.timeline.sort((a: TimelineItem, b: TimelineItem) => {
                                        return moment(a.startTime, 'h:mm a').isBefore(moment(b.startTime, 'h:mm a')) ? -1 : 1;
                                    }).map((x: TimelineItem) => {
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
                        <p className="text-center font-semibold">{`${eventTimeline?.event.startTime}-${eventTimeline?.event.endTime}`}</p>

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
                                        className="bg-orange-200 font-semibold flex-1"
                                        htmlType="submit"
                                    >
                                        Add
                                    </Button>
                                    <Button
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
                <Divider className="mx-1 " orientation="left">Guest Section</Divider>
                <div className="mt-3">
                    <Guest eventid={eventTimeline?._id}></Guest>

                </div>
            </div>
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

export default SingleTimeline;