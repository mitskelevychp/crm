import { useState, useCallback } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DateComponent from "../forms/DateComponent";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type CommentsProps = {
  comment: CommentType;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

interface CommentType {
  content: string;
  contactName: string;
  _id: string;
  date: string;
  dateNextContact: string;
}

interface State extends SnackbarOrigin {
  open: boolean;
}

const Comment: React.FC<CommentsProps> = ({ comment, setComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dateNextContact, setDateNextContact] = useState<string>("");
  const [contactName, setContactName] = useState(comment.contactName);
  const [content, setContent] = useState(comment.content);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleContactNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContactName(event.target.value);
    },
    []
  );
  const handleContentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    []
  );

  const handlerDeleteComment = async () => {
    try {
      const token = localStorage.getItem("token") || null;
      const setAuthToken = (token: string | null) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      };
      setAuthToken(token);

      // await axios.delete(`http://localhost:4000/api/comments/${comment._id}`);
      await axios.delete(
        `https://crm-portfolio-server.vercel.app/api/comments/${comment._id}`
      );
      setComments((prevComments) =>
        prevComments.filter((item) => item._id !== comment._id)
      );
    } catch (error) {
      console.error("Помилка при вході:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      const token = localStorage.getItem("token") || null;
      const setAuthToken = (token: string | null) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      };
      setAuthToken(token);

      const updatedComment = {
        content: content,
        contactName: contactName,
        dateNextContact: dateNextContact,
      };

      if (content !== "" && contactName !== "" && dateNextContact !== "") {
        // await axios.put(
        //   `https://alite-crm-server.vercel.app/api/comments/${comment._id}`,
        //   updatedComment
        // );
        try {
          await axios.put(
            `https://crm-portfolio-server.vercel.app/api/comments/${comment._id}`,
            updatedComment
          );
          setComments((prevComments) =>
            prevComments.map((item) =>
              item._id === comment._id ? { ...item, ...updatedComment } : item
            )
          );
          setState({ vertical: "bottom", horizontal: "right", open: true });
          setIsEditing(false);
        } catch (error) {
          console.error("Помилка відправленні даних:", error);
          // !!!!
          setState({
            ...state,
            open: true,
            vertical: "bottom",
            horizontal: "center",
          });
        }
      } else {
        // !!!!
        console.error("Всі поля мають бути заповнені.");
        setState({
          ...state,
          open: true,
          vertical: "bottom",
          horizontal: "center",
        });
      }
    } catch (error) {
      console.error("Помилка при вході:", error);
    }
  };

  const handlerEditComment = () => {
    setIsEditing(true);
    // setState({ vertical: "bottom", horizontal: "right", open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0px 10px",
        padding: "10px",
        borderLeft: "2px solid #c9c9c9",
        flexDirection: isEditing ? "column" : "row",
      }}
    >
      <Box
        key={comment._id}
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: isEditing ? "20px" : null,
        }}
      >
        {isEditing ? (
          // !!!
          <Box>
            <DateComponent
              setDate={setDateNextContact}
              // defaultValue={comment.dateNextContact}
            />
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              paddingRight: "20px",
            }}
          >
            The next contact`s date is: {comment.dateNextContact}
          </Typography>
        )}

        {isEditing ? (
          <TextField
            type="text"
            value={contactName}
            onChange={handleContactNameChange}
            size="small"
            label="Contact Name"
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              paddingRight: "20px",
            }}
          >
            Contact name: {contactName}
          </Typography>
        )}

        {isEditing ? (
          <TextField
            type="text"
            value={content}
            onChange={handleContentChange}
            size="small"
            label="Comment"
          />
        ) : (
          <Typography variant="body2">Message: {content}</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "20px",
        }}
      >
        {!isEditing && (
          <>
            <Box
              onClick={() => handlerEditComment()}
              // style={{ cursor: "pointer" }}
              sx={{
                cursor: "pointer",
              }}
            >
              <EditIcon
                sx={{
                  width: "15px",
                }}
              />
            </Box>
            <Box
              onClick={handlerDeleteComment}
              style={{ cursor: "pointer", color: "red" }}
            >
              <ClearIcon
                sx={{
                  width: "15px",
                }}
              />
            </Box>
          </>
        )}
      </Box>
      {isEditing ? (
        <>
          <Box
            sx={{
              width: "180px",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Box>
              <Button
                type="button"
                onClick={handleUpdateData}
                variant="contained"
              >
                Save
              </Button>
            </Box>
            <Box>
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setState({ ...state, open: false });
                }}
                // onClick={() => setIsEditing(false)}
                variant="contained"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </>
      ) : null}
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Comment edited"
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: "100%", bgcolor: "#00b1d0" }}
        >
          Comment edited
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Comment;
