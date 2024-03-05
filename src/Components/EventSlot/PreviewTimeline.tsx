import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios"
import { Divider, Spin, Timeline } from "antd";
import moment from "moment";
import { TimelineItem } from "../Timeline/TimelineTS";
import GuestTimeline from "./GuestTimeline";

const PreviewTimeline = ({ eventId }: { eventId: string | undefined }) => {
    // states and hooks
    const customAxios = useAxios()

    //fetching timeline from mongoose
    const {
        data: eventTimeline,
        isPending,
        isSuccess,
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
                                <Timeline
                                    mode="alternate"
                                    items={eventTimeline?.timeline.sort((a: TimelineItem, b: TimelineItem) => {
                                        return moment(a.startTime, 'h:mm a').isBefore(moment(b.startTime, 'h:mm a')) ? -1 : 1;
                                    }).map((x: TimelineItem) => {
                                        return {
                                            label: (
                                                <p
                                                    className="font-semibold cursor-pointer"
                                                >{`${x.startTime}-${x.endTime}`}</p>
                                            ),
                                            children: (
                                                <p
                                                    className="cursor-pointer"
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
                <Divider className="mx-1 " orientation="left">Guest Section</Divider>
                <div className="mt-3">
                    <GuestTimeline eventid={eventTimeline?._id}></GuestTimeline>

                </div>
            </div>

        </div>
    );
};

export default PreviewTimeline;