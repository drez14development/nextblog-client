import { useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CREATE_POST } from "../../../api/mutations";
import { GET_ALL_POSTS } from "../../../api/queries";
import { setFeedScrollPosition, setModalOpen } from "../../../store/postSlice";

export default function PostCreateForm({handleClose}: any) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState<HTMLInputElement>();
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const imgField = useRef<any | null>();

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, []);

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.loginData.token);
  const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
    variables: { input: { title, content, imgFile: img } },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const handleImgChange = (e: any) => {
    setFormError(null);
    const formFile = e.target.files[0];

    if (formFile.size <= 300000) {
      setImg(formFile);
    } else {
      setFormError("Image size must be below 300 KB");
      imgField.current.value = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost()
      .then((payload) => {
        dispatch(setModalOpen(false));
        dispatch(setFeedScrollPosition(0));
        Swal.fire({
          icon:"success",
          title:"Post was published successfully",
          showConfirmButton: false,
          timer: 1500,
          backdrop: false
        })
      })
      .catch((error) => setFormError(error.message));
  };

  return (
    <div className="post-create-form-wrapper bg-white shadow-md rounded p-4 md:p-8 mb-4">
      <Typography className="text-2xl text-center text-primary">
        New Post
      </Typography>
      <CloseIcon onClick={handleClose} className="absolute top-4 right-4 cursor-pointer"/>
      <form onSubmit={handleSubmit} className="post-create-form mt-4">
        <div className="mb-4 flex items-center">
          <label className="block text-md min-w-[70px]" htmlFor="title">
            Title
          </label>
          <input
            className={`
               shadow-lg appearance-none border-none rounded w-full py-2 px-3 leading-tight focus:shadow-outline`}
            id="title"
            type="text"
            maxLength={60}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            ref={titleInput}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-md min-w-[70px]" htmlFor="imgUrl">
            Image
          </label>
          <input
            className={`
               shadow-lg appearance-none border-none rounded w-full py-2 px-3 leading-tight focus:shadow-outline`}
            id="imgUrl"
            type="file"
            onChange={(e) => handleImgChange(e)}
            ref={imgField}
            maxLength={70}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-md min-w-[70px]" htmlFor="content">
            Content
          </label>
          <textarea
            className={`
               shadow-lg appearance-none border-none rounded w-full py-2 px-3 leading-tight focus:shadow-outline`}
            //@ts-ignore
            cols="30"
            //@ts-ignore
            rows="4"
            maxLength={280}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="blue-btn text-white hover:bg-blue-700 py-2 px-4 rounded focus:outline-blue-400 focus:shadow-outline"
            type="submit"
          >
            Publish
          </button>
        </div>
        {formError && (
          <div className="form-error bg-red-100 text-black text-center mt-4">
            {formError}
          </div>
        )}
      </form>
    </div>
  );
}
