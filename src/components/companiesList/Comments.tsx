import { useState, useCallback, useEffect } from "react";
// import { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CREATE_COMMENT } from "../../endpoints/endpoints";
import { Box, Typography } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DateComponent from "../forms/DateComponent";
import Skeleton from "@mui/material/Skeleton";

type CommentsProps = {
  id: string;
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

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [contactNameComment, setContactNameComment] = useState<string>("");
  const [contentComment, setContentComment] = useState<string>("");
  const [dateNextContact, setDateNextContact] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  function formatCurrentDate(): string {
    const currentDate: Date = new Date();
    const day: string = ("0" + currentDate.getDate()).slice(-2);
    const month: string = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const year: string = currentDate.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  const currentDate = formatCurrentDate();

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleClickButton = () => {
    handlerCreateNewComment();
    setState({ vertical: "bottom", horizontal: "right", open: true });
  };

  const handlerCreateNewComment = async () => {
    try {
      const newCommentData = {
        product: id,
        content: contentComment,
        contactName: contactNameComment,
        date: currentDate,
        dateNextContact: dateNextContact,
      };

      const token = localStorage.getItem("token") || null;
      const setAuthToken = (token: string | null) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      };
      setAuthToken(token);

      if (contentComment !== "") {
        const response = await axios.post(CREATE_COMMENT, newCommentData);
        const newComment: CommentType = response.data;
        setComments((prevComments) => [...prevComments, newComment]);
        setContactNameComment("");
        setContentComment("");
      }
    } catch (error) {
      console.error("Помилка при вході:", error);
    }
  };

  const handleContactNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContactNameComment(event.target.value);
    },
    []
  );

  const handleCommentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContentComment(event.target.value);
      setText(event.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          // `http://localhost:4000/api/comments/product/${id}`
          `https://crm-portfolio-server.vercel.app/api/comments/product/${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Помилка при вході:", error);
      } finally {
        setIsLoading(false); // Завантаження завершено
      }
    };

    fetchComments();
  }, [id]);

  const maxLength = 300;
  const [text, setText] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        borderTop: "1px solid #c9c9c9",
        // borderRadius: "5px",
        padding: "20px",
      }}
    >
      <Typography>Last contacts</Typography>
      {isLoading ? (
        <Skeleton variant="text" animation="wave" width="100%" height="100px" />
      ) : (
        comments.map((item) => (
          <Comment comment={item} key={item._id} setComments={setComments} />
        ))
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          paddingTop: "50px",
          rowGap: "20px",
        }}
      >
        <Typography>Add a new contact</Typography>
        <Box>
          {/* <DateComponent setDate={setDateNextContact} defaultValue={null} /> */}
          <DateComponent setDate={setDateNextContact} />
        </Box>
        <Box>
          <TextField
            // id="outlined-multiline-flexible"
            id="ContactName"
            label="Contact Name"
            onChange={handleContactNameChange}
            value={contactNameComment}
            sx={{
              width: "100%",
              "@media screen and (min-width: 768px)": {
                width: "270px",
              },
            }}
            variant="standard"
          />
        </Box>
        <Box>
          <TextField
            // id="outlined-multiline-flexible"
            id="contentComment"
            label="Comment"
            multiline
            maxRows={4}
            onChange={handleCommentChange}
            value={contentComment}
            fullWidth
            inputProps={{
              maxLength: maxLength,
            }}
            helperText={`${text.length}/${maxLength}`}
            // inputProps={{
            //   maxLength: 300,
            // }}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleClickButton}>
            Send
          </Button>
        </Box>
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="Comment sended"
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            sx={{ width: "100%", bgcolor: "#00b1d0" }}
          >
            Comment sended
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Comments;
