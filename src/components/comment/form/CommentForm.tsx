import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CREATE_COMMENT } from "../../../api/mutations";
import { GET_COMMENTS } from "../../../api/queries";

interface Props{
    postId: string,
    isReplyTo: null | string,
    triggerRefetch: null | any
}

export default function CommentForm({ postId, isReplyTo, triggerRefetch}: Props) {
  
  const token = useSelector((state: any) => state.auth.loginData.token);
  const [content, setContent] = useState<string>("");
  const [createComment, { loading, error, data }] = useMutation(
    CREATE_COMMENT,
    {
      variables: { input: { content, post: postId, isReplyTo } },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!content.length){
      Swal.fire({
        icon: 'warning',
        title: 'Comment cannot be empty',
        showConfirmButton: false,
        timer: 2000
      })
      return
    }
    await createComment();
    setContent("");
    triggerRefetch();
  };

  return (
    <form onSubmit={handleSubmit} className={`${isReplyTo ? "isReplyTo" : "mb-2"} comment-create-form`}>
      <Box sx={{ display: "flex", flexWrap: "wrap", position: "relative" }}>
        <TextField
          placeholder={`${isReplyTo? "Write your reply" : "Write your comment"}`}
          className="form-input"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          fullWidth
          autoComplete="off"
        />
        <Button type="submit" variant="contained" className="blue-btn btn-submit">
          <span style={{ opacity: loading ? 0 : 1 }}>Send</span>
          {loading && (
            <CircularProgress
              size={22}
              sx={{ color: "#fff", position: "absolute" }}
            />
          )}
        </Button>
      </Box>
    </form>
  );
}
