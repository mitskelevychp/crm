import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
};
type HeadlineProps = {
  user: UserType | null;
};

const Headline: React.FC<HeadlineProps> = ({ user }) => {
  return (
    <>
      {user ? (
        <Typography
          variant="h1"
          component="h1"
          sx={{
            paddingTop: "50px",
          }}
        >
          {user?.mainUser && user
            ? `${user?.firstName} ${user?.lastName}, login: ${user?.login}`
            : `${user?.firstName} ${user?.lastName}, login: ${user?.login}`}
        </Typography>
      ) : (
        <Skeleton
          variant="text"
          animation="wave"
          width="300px"
          sx={{
            paddingTop: "50px",
          }}
        />
      )}
    </>
  );
};

export default Headline;
