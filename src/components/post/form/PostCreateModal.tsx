import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../../store/postSlice";
import PostCreateForm from "./PostCreateForm";


export default function PostCreateModal() {
  const [open, setOpen] = React.useState(false);
  const isPostModalOpen: boolean = useSelector((state: any) => state.posts.isPostModalOpen)
  const dispatch = useDispatch();

  React.useEffect(() => {
      setOpen(isPostModalOpen);
  }, [isPostModalOpen]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setModalOpen(false));
  };

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="post-create-modal-wrapper">
            <PostCreateForm handleClose={handleClose}/>
          </Box>
        </Modal>
      </div>
    );
}
