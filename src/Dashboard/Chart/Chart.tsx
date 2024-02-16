import Chart from "react-apexcharts";
import AxiosSecure from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { BsClockFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { Spin } from "antd";

export default function ChartComponent() {
  const caxios = AxiosSecure();
  const { userData } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["userCharts"],
    queryFn: async () => {
      const res = await caxios.get(`/usercharts?id=${userData?._id}`);
      return res.data;
    },
    enabled: userData != null ? true : false,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const categories = data?.meeting?.map((e: string) => e.toLowerCase()) || [];

  const options1 = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: categories,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series1 = [
    {
      data: data?.attendee || [],
    },
  ];

  const options2 = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: data?.eventType || [],
    colors: ["#176B87", "#B4D4FF", "#7c3aed", "#86B6F6", "#95dc8d"],
    legend: {
      show: false,
    },
  };

  const series2 = data?.eventNumber || [];

  return (
    <div>
      <Card
        className="mb-8 border shadow-sm border-blue-gray-100"
        placeholder={undefined}>
        <CardHeader
          variant="gradient"
          floated={false}
          shadow={false}
          placeholder={undefined}>
          <Chart height={340} type="bar" series={series1} options={options1} />
        </CardHeader>
        <CardBody className="px-6 pt-0" placeholder={undefined}>
          <Typography variant="h6" color="blue-gray" placeholder={undefined}>
            Meeting Attendee Statistics
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-blue-gray-600"
            placeholder={undefined}>
            Showing statistics for meeting attendees.
          </Typography>
        </CardBody>
        <CardFooter
          className="px-6 py-5 border-t border-blue-gray-50"
          placeholder={undefined}>
          <p className="flex items-center gap-1">
            <BsClockFill /> just updated
          </p>
        </CardFooter>
      </Card>
      <Card
        className="border shadow-sm border-blue-gray-100"
        placeholder={undefined}>
        <CardHeader
          className="flex items-center justify-center"
          variant="gradient"
          floated={false}
          shadow={false}
          placeholder={undefined}>
          <Chart
            height={340}
            width={340}
            type="pie"
            series={series2}
            options={options2}
          />
        </CardHeader>
        <CardBody className="px-6 pt-0" placeholder={undefined}>
          <Typography variant="h6" color="blue-gray" placeholder={undefined}>
            Event Type Distribution
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-blue-gray-600"
            placeholder={undefined}>
            Showing distribution of event types.
          </Typography>
        </CardBody>
        <CardFooter
          className="px-6 py-5 border-t border-blue-gray-50"
          placeholder={undefined}>
          <p className="flex items-center gap-1">
            <BsClockFill /> updated 4 min ago
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
