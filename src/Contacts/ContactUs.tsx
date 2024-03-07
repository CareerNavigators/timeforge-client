import emailjs from "@emailjs/browser";
import { useRef } from "react";
import showToast from "../Hook/swalToast";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm("service_90pztkf", "template_34ngdbs", e.currentTarget, {
        publicKey: "GxNAwQIFJori2bef3",
      })
      .then(
        () => {
          showToast("success", "Message Sent Successfully!");
          navigate("/");
        },
        (error) => {
          showToast("error", "Message Failed!");
          console.log(error);
        }
      );
  };

  return (
    <div className="max-w-7xl lg:mx-auto pt-24 lg:p-0 mb-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-5 lg:gap-0">
        <section>
          <div id="contact">
            <div className="flex flex-col space-y-4 max-w-5xl mx-auto justify-center rounded-2xl p-8 lg:p-12 lg:mt-10 shadow-md lg:shadow-xl">
              <h1 className="text-2xl lg:text-3xl text-black font-semibold">
                Contact Us
              </h1>
              <p className="w-[300px] lg:w-[500px] font-light text-sm text-black text-justify">
                We're all ears and excited to hear from you. Just fire away
                using the contact form below, and we'll be quick to swing by you
                inbox.
              </p>
              <div className="w-full flex flex-col text-center items-center justify-center">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-5 mt-3 text-left">
                    <p className="text-sm mb-2">Name</p>
                    <input
                      type="text"
                      name="from_name"
                      className="p-2 rounded-lg w-[300px] lg:w-[500px] bg-[#eadeff7e] border border-white focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mb-5 mt-3 text-left">
                    <p className="text-sm mb-2">Email</p>
                    <input
                      type="email"
                      name="from_email"
                      className="p-2 rounded-lg  w-full bg-[#eadeff7e] border border-white focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mb-5 mt-3 text-left">
                    <p className="text-sm mb-2">Message</p>
                    <textarea
                      name="message"
                      className="p-2 rounded-lg w-full h-40 lg:h-60 bg-[#eadeff7e] border border-white  focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 w-full py-2 font-bold text-white transition-transform transform rounded-md bg-gradient-to-r from-[#7c3aed] via-[#6b23e7] to-[#5b09e9] hover:scale-105"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            className="w-full lg:h-96"
            viewBox="0 0 890 729.78732"
          >
            <path
              d="M374.67742,751.01587l1.81026,38.1569.00007.00154a24.3452,24.3452,0,0,1-23.16357,25.46925l-.79019.03746-2.96371-62.47386Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M917.17122,686.53355c-18.17322,35.46508-41.224,69.7641-70.38922,100.80761-.64771.70105-1.30188,1.384-1.96192,2.07929l-69.10083-32.713c.42273-.70234.88623-1.49061,1.38458-2.3526,29.68323-50.787,208.86487-360.59147,203.20295-430.75837C980.96632,329.38352,1002.20491,520.76548,917.17122,686.53355Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <path
              d="M860.11317,793.65232c-.96722.54981-1.959,1.088-2.95721,1.60809l-51.83789-24.54052c.72473-.51422,1.569-1.1222,2.53943-1.80591,15.88128-11.40253,63.10528-45.61328,109.31366-82.38043,49.658-39.51087,98.15216-81.96412,105.35394-102.22834C1021.06221,588.952,975.61067,730.20231,860.11317,793.65232Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <circle cx="86.22975" cy="648.0507" r="80" fill="#6c63ff" />
            <path
              d="M273.2751,699.58573H209.18439a10.69386,10.69386,0,0,0-10.68178,10.68176v45.779a10.69381,10.69381,0,0,0,10.68178,10.68182h64.09077A10.69381,10.69381,0,0,0,283.957,756.04649v-45.779A10.69383,10.69383,0,0,0,273.2751,699.58573Zm0,6.10388a4.559,4.559,0,0,1,1.13373.14789l-33.17169,26.46131-32.97773-26.51514a4.58034,4.58034,0,0,1,.92491-.09406Zm0,54.93482H209.18439a4.58319,4.58319,0,0,1-4.5779-4.57794V710.67857l34.711,27.90887a3.052,3.052,0,0,0,3.81549.00726l34.72012-27.69677v45.14849A4.58318,4.58318,0,0,1,273.2751,760.62443Z"
              transform="translate(-155 -85.10634)"
              fill="#fff"
            />
            <path
              d="M549.9684,617.65757l17.90008.14728a12.45369,12.45369,0,0,0,12.39838-14.43006h0a12.45377,12.45377,0,0,0-17.80695-9.19146L545.57942,602.513l-57.73651,12.87561-24.7352-25.28925-14.20819,23.401,33.378,25.78785Z"
              transform="translate(-155 -85.10634)"
              fill="#ffb8b8"
            />
            <path
              d="M546.61342,802.59623l-21.08948,4.05566c-14.40533-45.4085-30.013-88.41082-30.012-121.67016-20.38611,22.689-45.66654,35.66931-75.43552,39.7456l3.24454-50.29034,24.334-12.97815,37.243-17.18909a28.28091,28.28091,0,0,1,10.36481-2.5639h0a28.28067,28.28067,0,0,1,29.41186,23.7735Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M445.62712,718.64384l-8.40558,6.38824a26.03086,26.03086,0,0,1-25.66205,3.3454h0C387.48408,710.3314,370.38,715.65526,354.878,742.89366c-18.59411-20.98529-23.18156-51.29462-6.587-82.6515L440.35475,662.27l18.6561-5.67792Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M414.96663,812.623h0a23.5069,23.5069,0,0,1-27.81977-11.721c-8.27362-7.28741-15.25454-17.72094-21.30929-30.40863a235.35256,235.35256,0,0,1-11.16718-28.68322c-4.18966-12.94007,2.81586-27.07679,15.85471-30.94812q.58159-.17268,1.17737-.32557c17.40628-4.46887,35.28122,5.57062,41.23114,22.5279l17.30115,49.30829a23.50693,23.50693,0,0,1-14.39835,29.964Q415.40437,812.48826,414.96663,812.623Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M362.8914,764.87846s20.27835,22.71179,24.334,35.68994"
              transform="translate(-155 -85.10634)"
              opacity="0.2"
            />
            <path
              d="M284.244,657.693l-6.7868,16.56427a12.45392,12.45392,0,0,0,8.79114,16.872h0a12.45388,12.45388,0,0,0,15.14907-13.11774l-1.46231-18.767,9.4957-58.38764,32.66858-13.56958-16.44763-21.885L289.30925,586.811Z"
              transform="translate(-155 -85.10634)"
              fill="#ffb8b8"
            />
            <path
              d="M446.43825,660.2421c-23.30585,39.14728-69.76678,54.306-109.5603,23.65156,7-23,29.60041-86.56659,15-89-31,13-31.045-17.52289-36.84348-32.7989l70.56869-25.95629,38.12336,10.54473,7.81478,2.773a26.41991,26.41991,0,0,1,17.58228,24.53687C433.10939,597.12864,421.25426,621.80863,446.43825,660.2421Z"
              transform="translate(-155 -85.10634)"
              fill="#6c63ff"
            />
            <path
              d="M455.36073,628.60789,427.3766,605.49058l9.32806-53.94043,38.12333,40.5567Z"
              transform="translate(-155 -85.10634)"
              fill="#6c63ff"
            />
            <path
              id="bc7f4772-a479-43ba-84b6-0038831d0625-104"
              data-name="b82a9922-ead1-40af-af3b-f133b244cde7"
              d="M919.70454,258.05134h-4v-109.545a63.4,63.4,0,0,0-63.4-63.4h-232.087a63.4,63.4,0,0,0-63.4,63.4v600.974a63.4,63.4,0,0,0,63.4,63.4H852.30348a63.4,63.4,0,0,0,63.4-63.4V336.02732h4Z"
              transform="translate(-155 -85.10634)"
              fill="#3f3d56"
            />
            <path
              id="e7549b14-e146-4c1f-8b4f-7638ef62aaf0-105"
              data-name="b2a7827b-2d2c-407d-93be-35e4c67116bc"
              d="M854.8625,101.59933h-30.295a22.495,22.495,0,0,1-20.828,30.994h-132.959a22.495,22.495,0,0,1-20.827-30.991h-28.3a47.348,47.348,0,0,0-47.348,47.348v600.089a47.348,47.348,0,0,0,47.348,47.348H854.85353a47.348,47.348,0,0,0,47.348-47.348v-.00013h0V148.9473a47.348,47.348,0,0,0-47.348-47.348h.009Z"
              transform="translate(-155 -85.10634)"
              fill="#fff"
            />
            <circle
              id="f4a12a6a-3235-4aa9-87a4-fdfa38e5097e"
              data-name="e6b07811-3d0f-4972-ba4c-46b0c6566e33"
              cx="583.65849"
              cy="651.74596"
              r="26"
              fill="#e6e6e6"
            />
            <path
              d="M633.1822,496.40455c-2.45764,0-4.45758,2.28274-4.45758,5.08789s1.99994,5.08789,4.45758,5.08789H843.32478c2.45764,0,4.45758-2.28275,4.45758-5.08789s-1.99994-5.08789-4.45758-5.08789Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <path
              d="M633.1822,616.40458c-2.45764,0-4.45758,2.28271-4.45758,5.08789s1.99994,5.08789,4.45758,5.08789H843.32478c2.45764,0,4.45758-2.28271,4.45758-5.08789s-1.99994-5.08789-4.45758-5.08789Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <path
              d="M633.1822,526.93192c-2.45764,0-4.45758,2.28272-4.45758,5.08789s1.99994,5.08789,4.45758,5.08789h90.425c2.45764,0,4.45758-2.28271,4.45758-5.08789s-1.99994-5.08789-4.45758-5.08789Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <path
              d="M633.1822,556.03031c-2.45764,0-4.45758,2.28272-4.45758,5.08789s1.99994,5.08789,4.45758,5.08789H843.32478c2.45764,0,4.45758-2.28271,4.45758-5.08789s-1.99994-5.08789-4.45758-5.08789Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <path
              d="M633.1822,586.55772c-2.45764,0-4.45758,2.28271-4.45758,5.08789s1.99994,5.08789,4.45758,5.08789h90.425c2.45764,0,4.45758-2.28272,4.45758-5.08789s-1.99994-5.08789-4.45758-5.08789Z"
              transform="translate(-155 -85.10634)"
              fill="#e6e6e6"
            />
            <path
              d="M672.85322,264.7335H803.66676a5.457,5.457,0,0,1,5.45056,5.45053V406.42094a5.457,5.457,0,0,1-5.45056,5.45053H672.85322a5.457,5.457,0,0,1-5.45056-5.45053V270.184A5.457,5.457,0,0,1,672.85322,264.7335Z"
              transform="translate(-155 -85.10634)"
              fill="#6c63ff"
            />
            <path
              d="M775.793,383.777a3.70044,3.70044,0,1,0,.0036-7.40087H700.727a3.70044,3.70044,0,1,0-.0036,7.40087H775.793Z"
              transform="translate(-155 -85.10634)"
              fill="#fff"
            />
            <path
              d="M775.793,361.9748a3.70044,3.70044,0,0,0,0-7.40088H700.727a3.70044,3.70044,0,1,0-.0036,7.40088H775.793Z"
              transform="translate(-155 -85.10634)"
              fill="#fff"
            />
            <path
              d="M738.25972,292.828a23.29256,23.29256,0,1,1-23.29254,23.29257v0A23.3189,23.3189,0,0,1,738.25972,292.828Z"
              transform="translate(-155 -85.10634)"
              fill="#fff"
            />
            <path
              d="M441.06405,529.07654H371.91424a5.37113,5.37113,0,0,1-5.36508-5.36507V493.90552a39.94,39.94,0,1,1,79.88,0v29.80595A5.37113,5.37113,0,0,1,441.06405,529.07654Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <circle
              cx="414.12375"
              cy="497.99856"
              r="29.28259"
              transform="translate(-376.48586 537.39714) rotate(-61.33682)"
              fill="#ffb6b6"
            />
            <path
              d="M455.878,496.88611H413.59454l-.4337-6.07063-2.16792,6.07063h-6.51073l-.85925-12.03182-4.29683,12.03182h-12.598V496.29a31.6298,31.6298,0,0,1,31.594-31.59431h5.96148A31.63,31.63,0,0,1,455.878,496.29Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M413.24849,534.64042a5.48116,5.48116,0,0,1-.94949-.08382l-30.9618-5.46288V477.923h34.083l-.84382.98383c-11.74017,13.69211-2.89531,35.894,3.42186,47.90957a5.28566,5.28566,0,0,1-.42,5.6119A5.34351,5.34351,0,0,1,413.24849,534.64042Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M516.33268,787.28155l38.19981-.00155h.00155A24.34522,24.34522,0,0,1,578.878,811.62353v.79108l-62.54411.00232Z"
              transform="translate(-155 -85.10634)"
              fill="#2f2e41"
            />
            <path
              d="M1044,814.89366H156a1,1,0,0,1,0-2h888a1,1,0,0,1,0,2Z"
              transform="translate(-155 -85.10634)"
              fill="#cacaca"
            />
          </svg>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
