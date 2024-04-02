import { useState, useCallback } from "react";
import axios from "axios";
import { CREATE_COMPANY } from "../../endpoints/endpoints";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Comments from "./Comments";
import CompanyType from "../../scripts/sortProducts";
import DocumentTitle from "../../routes/DocumentTitle";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
};
type ItemProps = {
  company: CompanyType;
  updateCompanyInList: (updatedCompany: CompanyType) => void;
  user: UserType | null;
};
interface State extends SnackbarOrigin {
  open: boolean;
}

export const CompanyItem: React.FC<ItemProps> = ({
  company,
  updateCompanyInList,
  user,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(company.name);
  const [manager, setManager] = useState(company.categories);

  const [companySite, setCompanySite] = useState(company.site);
  const [quantityVacanciesSite, setQuantityVacanciesSite] = useState(
    company.quantityVacanciesSite
  );
  const [companyLinkLinkedIn, setCompanyLinkLinkedIn] = useState(
    company.linkLinkedIn
  );
  const [quantityVacanciesLinkedIn, setQuantityVacanciesLinkedIn] = useState(
    company.quantityVacanciesLinkedIn
  );
  const [companyContactName, setCompanyContactName] = useState(
    company.contactName
  );
  const [companyContactPosition, setCompanyContactPosition] = useState(
    company.contactPosition
  );
  const [companyEmail, setCompanyEmail] = useState(company.contactEmail);
  const [companyPhone, setCompanyPhone] = useState(company.contactPhone);
  const [status, setStatus] = useState<string>(company.status);

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  // ----------------------------- Handle -----------------------------
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyName(event.target.value);
    },
    []
  );
  const handleManagerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setManager(event.target.value);
    },
    []
  );
  const handleCompanySiteChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanySite(event.target.value);
    },
    []
  );
  const handleQuantityVacanciesSiteChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuantityVacanciesSite(event.target.value);
    },
    []
  );
  const handleCompanyLinkLinkedInChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyLinkLinkedIn(event.target.value);
    },
    []
  );
  const handleQuantityVacanciesLinkedInChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuantityVacanciesLinkedIn(event.target.value);
    },
    []
  );

  const handleContactNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyContactName(event.target.value);
    },
    []
  );
  const handleContactPositionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyContactPosition(event.target.value);
    },
    []
  );
  const handleCompanyEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyEmail(event.target.value);
    },
    []
  );
  const handleCompanyPhoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyPhone(event.target.value);
    },
    []
  );
  const handleCompanyStatusChange = useCallback((event: SelectChangeEvent) => {
    setStatus(event.target.value);
  }, []);

  const handleUpdateServerData = useCallback(async () => {
    try {
      const updateProp = {
        name: companyName,
        contactName: companyContactName,
        contactEmail: companyEmail,
        contactPhone: companyPhone,
        status: status,
        linkLinkedIn: companyLinkLinkedIn,
        site: companySite,
        contactPosition: companyContactPosition,
        quantityVacanciesSite: quantityVacanciesSite,
        quantityVacanciesLinkedIn: quantityVacanciesLinkedIn,
        categories: manager,
      };

      const response = await axios.put(
        CREATE_COMPANY + `/${company._id}`,
        updateProp
      );
      updateCompanyInList(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Помилка при вході:", error);
    }
  }, [
    companyName,
    companySite,
    companyLinkLinkedIn,
    company._id,
    updateCompanyInList,
    companyContactName,
    companyEmail,
    companyPhone,
    status,
    companyContactPosition,
    quantityVacanciesSite,
    quantityVacanciesLinkedIn,
    manager,
  ]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleClickButton = () => {
    setIsEditing(true);
    setState({ vertical: "bottom", horizontal: "right", open: true });
  };

  return (
    <>
      <DocumentTitle title={`${company.name}`} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          // border: "1px solid #c9c9c9",
          // borderRadius: "5px",
        }}
      >
        {isEditing ? (
          <Box
            sx={{
              width: "100%",
              border: "1px solid #c9c9c9",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "@media screen and (min-width: 768px)": {
                  flexDirection: "row",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100px",
                }}
              >
                <TextField
                  type="text"
                  value={companyName}
                  onChange={handleNameChange}
                  size="small"
                  label="Name"
                  sx={{
                    textTransform: "capitalize",
                  }}
                />
                {user?.mainUser ? (
                  <TextField
                    type="text"
                    value={manager}
                    onChange={handleManagerChange}
                    size="small"
                    label="Manager"
                  />
                ) : null}
              </Box>
              <FormControl
                size="small"
                sx={{
                  m: 1,
                  minWidth: 120,
                  margin: "20px 0px 0px",
                  "@media screen and (min-width: 768px)": {
                    margin: 0,
                  },
                }}
              >
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  labelId="select-status"
                  name="status"
                  onChange={(event) => {
                    handleCompanyStatusChange(event); // Перша подія
                    // handleChange(event); // Друга подія
                  }}
                  label="Status"
                  value={status}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="delete">Delete</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "40px",
                "@media screen and (min-width: 768px)": {
                  height: "140px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  rowGap: "20px",
                  flexDirection: "column",
                  "@media screen and (min-width: 768px)": {
                    flexDirection: "row",
                    columnGap: "20px",
                  },
                }}
              >
                <TextField
                  type="text"
                  value={companySite}
                  onChange={handleCompanySiteChange}
                  size="small"
                  label="Site"
                  sx={{
                    "@media screen and (min-width: 768px)": {
                      width: "50%",
                    },
                  }}
                />
                <TextField
                  type="text"
                  value={quantityVacanciesSite}
                  onChange={handleQuantityVacanciesSiteChange}
                  size="small"
                  label="Quantity of vacancies"
                  sx={{
                    "@media screen and (min-width: 768px)": {
                      width: "50%",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  rowGap: "20px",
                  flexDirection: "column",
                  marginTop: "20px",
                  "@media screen and (min-width: 768px)": {
                    flexDirection: "row",
                    columnGap: "20px",
                    margin: "0px",
                  },
                }}
              >
                <TextField
                  type="text"
                  value={companyLinkLinkedIn}
                  onChange={handleCompanyLinkLinkedInChange}
                  size="small"
                  label="Link to LinkedIn"
                  sx={{
                    "@media screen and (min-width: 768px)": {
                      width: "50%",
                    },
                  }}
                />
                <TextField
                  type="text"
                  value={quantityVacanciesLinkedIn}
                  onChange={handleQuantityVacanciesLinkedInChange}
                  size="small"
                  label="Quantity of vacancies"
                  sx={{
                    "@media screen and (min-width: 768px)": {
                      width: "50%",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "40px",
                flexDirection: "column",
                rowGap: "20px",
                "@media screen and (min-width: 768px)": {
                  flexDirection: "row",
                  rowGap: "0px",
                },
              }}
            >
              <TextField
                type="text"
                value={companyContactName}
                onChange={handleContactNameChange}
                size="small"
                label="Contact"
              />
              <TextField
                type="text"
                value={companyContactPosition}
                onChange={handleContactPositionChange}
                size="small"
                label="Position"
              />
              <TextField
                type="text"
                value={companyEmail}
                onChange={handleCompanyEmailChange}
                size="small"
                label="Email"
              />
              <TextField
                type="text"
                value={companyPhone}
                onChange={handleCompanyPhoneChange}
                size="small"
                label="Phone number"
              />
            </Box>
            <Box
              sx={{
                width: "180px",
                paddingTop: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="button"
                onClick={handleUpdateServerData}
                variant="contained"
              >
                Save
              </Button>
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
        ) : (
          <Box
            sx={{
              width: "100%",
              border: "1px solid #c9c9c9",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{
                    color: "#7c7e7d",
                    textTransform: "capitalize",
                  }}
                >
                  {companyName}
                </Typography>
                {user?.mainUser ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#00b1d0",
                      fontWeight: 700,
                    }}
                  >
                    {manager}, added: {company.dateCreate}
                  </Typography>
                ) : null}
              </Box>
              <Typography
                variant="body2"
                color={
                  status === "open"
                    ? "#0ea356"
                    : status === "delete"
                    ? "#fc4444"
                    : "#7c7e7d"
                }
                sx={{
                  fontWeight: 700,
                }}
              >
                {status}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                paddingBottom: "20px",
                flexDirection: "column",
                "@media screen and (min-width: 768px)": {
                  flexDirection: "row",
                },
              }}
            >
              <Box
                sx={{
                  // bgcolor: "#7c7e7d",
                  padding: "20px 0px 20px",
                  borderRadius: "5px",
                }}
              >
                <Typography>Data:</Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href={companySite}
                  target="_blank"
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  {companySite},
                </Typography>
                <Typography variant="body2">
                  (quantity of vacancies: {quantityVacanciesSite})
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  href={companyLinkLinkedIn}
                  target="_blank"
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  {companyLinkLinkedIn}
                </Typography>
                <Typography variant="body2">
                  (quantity of vacancies: {quantityVacanciesLinkedIn})
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  "@media screen and (min-width: 768px)": {
                    paddingLeft: "100px",
                  },
                }}
              >
                <Typography>Contact:</Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: "700" }}>
                    {companyContactName}
                  </span>
                  , {companyContactPosition}
                </Typography>
                <Typography variant="body2">Email: {companyEmail}</Typography>
                <Typography variant="body2">
                  Phone number: {companyPhone}
                </Typography>
              </Box>
            </Box>
            {manager === user?.login || user?.mainUser ? (
              <Button
                type="button"
                // onClick={() => setIsEditing(true)}
                onClick={() => handleClickButton()}
                variant="contained"
              >
                Edit
              </Button>
            ) : null}
            <Snackbar
              autoHideDuration={2000}
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="Сhanged successfully"
              key={vertical + horizontal}
            >
              <Alert
                onClose={handleClose}
                variant="filled"
                sx={{ width: "100%", bgcolor: "#00b1d0" }}
              >
                Сhanged successfully
              </Alert>
            </Snackbar>
          </Box>
        )}
      </Box>
      {/* Comments block */}
      <Box
        sx={{
          marginTop: "50px",
        }}
      >
        <Comments id={company._id} />
      </Box>
    </>
  );
};
