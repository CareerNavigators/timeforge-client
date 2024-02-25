import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../Hook/useAxios";
import { Note } from "./Note";
import { Button, Card, Modal, Spin } from "antd";
import { FiEdit } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Note.css";
import moment from "moment";
const Note2 = () => {
  const [singleNote, setSingleNote] = useState<Note>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [singleNoteContent, setSingleNoteContent] = useState<string>();
  const { userData } = useContext(AuthContext);
  const handelOpen = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handelClose = () => {
    setIsOpenModal(!isOpenModal);
  };
  const caxios = AxiosSecure();
  const userNotes = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await caxios.get(`/note?userid=${userData._id}`);
      return res.data as Note[];
    },
    enabled: userData != null,
    retry: 2,
    refetchOnWindowFocus: false,
  });
  const selectSingleNote = (id: string) => {
    const t_singleNote = userNotes.data?.filter((x) => x._id == id);
    if (t_singleNote && t_singleNote.length != 0) {
      setSingleNote(t_singleNote[0]);
      setSingleNoteContent(t_singleNote[0].content);
    }
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const updateMutation = useMutation({
    mutationFn: async () => {
      if (singleNote) {
        const res = await caxios.patch(`/note/${singleNote._id}`, {
          content: singleNoteContent,
        });
        return res.data;
      }
      return [];
    },
    onSuccess: async () => {
      userNotes.refetch();
      handelClose();
    },
  });
  function updateNote() {
    updateMutation.mutateAsync();
  }

  return (
    <div className="p-3 w-full ">
      <h1 className="text-3xl font-bold text-center font-inter">
        <span className="text-[#7c3aed]">{userData?.name}'s</span> Recent notes
      </h1>
      <div className="grid  px-3 lg:gap-x-[200px] gap-y-10 grid-cols-1 lg:grid-cols-4 max-w-7xl mt-[50px] mx-auto">
        {userData == null ||
        userNotes.isLoading ||
        userNotes.isRefetching ||
        userNotes.isFetching ? (
          <div className="flex justify-center ">
            <Spin size="large"></Spin>{" "}
          </div>
        ) : userNotes.isSuccess ? (
          <>
            {userNotes.data.map((x, index) => {
              return (
                <Card
                  key={index}
                  className="w-[330px] mx-auto h-[200px] shadow-xl"
                  size="small"
                  title={`Notes for ${x.title}`}
                  extra={
                    <Button
                      className="shadow-inner shadow-gray-700"
                      onClick={() => {
                        selectSingleNote(x._id), handelOpen();
                      }}
                    >
                      <FiEdit />
                    </Button>
                  }
                >
                  <ReactQuill
                    value={x.content}
                    readOnly={true}
                    modules={{ toolbar: false }}
                  />
                </Card>
              );
            })}
          </>
        ) : (
          <p className="text-red-600 text-lg font-bold">Something Error</p>
        )}
      </div>
      <div>
        <Modal
          width={800}
          title={`Notes for ${singleNote?.title}`}
          destroyOnClose={true}
          open={isOpenModal}
          onCancel={handelClose}
          footer={null}
        >
          {singleNote ? (
            <>
              <p className="italic">
                {moment(singleNote.createdAt).format("MMM Do YY, h:mm a")}
              </p>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={singleNoteContent}
                onChange={setSingleNoteContent}
              />
              <div className="flex gap-4 justify-center mt-2">
                {updateMutation.isPending ? (
                  <div className="flex justify-center">
                    <Spin size="large"></Spin>{" "}
                  </div>
                ) : (
                  <>
                    <Button
                      className="bg-light-blue-500 text-white"
                      onClick={updateNote}
                    >
                      Update
                    </Button>
                    <Button onClick={handelClose}>Close</Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="text-red-600 text-lg font-bold">Something Error</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Note2;
