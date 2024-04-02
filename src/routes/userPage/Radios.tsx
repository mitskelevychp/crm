import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
};
type RadiosType = {
  setFormCreateUserOpen: (isFormCreateUserOpen: boolean) => void;
  setFormCreateCompanyOpen: (isFormCreateCompanyOpen: boolean) => void;
  setCompanyListOpen: (isCompanyListOpen: boolean) => void;
  // setEditOpen: (isEditOpen: boolean) => void;
  user: UserType | null;
};

const Radios: React.FC<RadiosType> = ({
  setFormCreateUserOpen,
  setFormCreateCompanyOpen,
  setCompanyListOpen,
  // setEditOpen,
  user,
}) => {
  return (
    <FormControl>
      <RadioGroup name="radio-buttons-group" row defaultValue="company list">
        <FormControlLabel
          value="company list"
          control={<Radio />}
          label="List"
          labelPlacement="bottom"
          onClick={() => {
            setCompanyListOpen(true);
            setFormCreateCompanyOpen(false);
            setFormCreateUserOpen(false);
            // setEditOpen(false);
          }}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />
        {user?.mainUser ? (
          <FormControlLabel
            value="create manager"
            control={<Radio />}
            label="New manager"
            labelPlacement="bottom"
            onClick={() => {
              setFormCreateUserOpen(true);
              setFormCreateCompanyOpen(false);
              setCompanyListOpen(false);
              // setEditOpen(false);
            }}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 16,
              },
              "& .MuiFormControlLabel-label": {
                fontSize: 14,
              },
            }}
          />
        ) : null}
        <FormControlLabel
          value="create company"
          control={<Radio />}
          label="New company"
          labelPlacement="bottom"
          onClick={() => {
            setFormCreateCompanyOpen(true);
            setFormCreateUserOpen(false);
            setCompanyListOpen(false);
            // setEditOpen(false);
          }}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        />
        {/* <FormControlLabel
          value="edit"
          control={<Radio />}
          label="Edit & Search"
          labelPlacement="bottom"
          onClick={() => {
            setEditOpen(true);
            setCompanyListOpen(false);
            setFormCreateCompanyOpen(false);
            setFormCreateUserOpen(false);
          }}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
            },
          }}
        /> */}
      </RadioGroup>
    </FormControl>
  );
};

export default Radios;
