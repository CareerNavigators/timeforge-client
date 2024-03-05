import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

   
  export function Success() {
    const navigate = useNavigate();
    const backToShopping=()=>{
      navigate("/merch");
    }
    return (
      <Card placeholder={undefined}
      className="mt-[200px] w-96 flex justify-center items-center mx-auto">
        <CardBody placeholder={undefined}>
        <FaMoneyCheckDollar className="text-center text-[50px] text-green-500 flex justify-center mx-auto"/>

          <Typography placeholder={undefined} variant="h5" color="blue-gray" className="mb-2 text-center">
            Payment Successful
          </Typography>
          <Typography placeholder={undefined} className="text-[16px] mt-3 font-thin">
            Thank you for shopping on Timeforge. We are really pleased because you visit our app, and we request you to share it to your friends and family.
          </Typography>
        </CardBody>
        <CardFooter placeholder={undefined} className="pt-0">
          <a href="#" className="inline-block">
            <Button onClick={backToShopping}
             placeholder={undefined} size="sm" color="green"  className="flex items-center gap-2">
              Continue Shopping
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardFooter>
      </Card>
    );
  }