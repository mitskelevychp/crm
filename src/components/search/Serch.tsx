import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { SEARCH_COMPANY } from "../../endpoints/endpoints";
import CompanyType from "../../scripts/sortProducts";
import { useNavigate } from "react-router-dom";
import { debounce } from "@mui/material/utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
};
type HeadlineProps = {
  user: UserType | null;
};

const Serch: React.FC<HeadlineProps> = ({ user }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<CompanyType[]>([]);
  const navigate = useNavigate();

  const fetch = useMemo(
    () =>
      debounce((query) => {
        if (!query) return;
        const searchPhrases = {
          query,
        };

        axios
          .post(SEARCH_COMPANY, searchPhrases)
          .then((response) => {
            setOptions(response.data);
          })
          .catch((error) => {
            console.error("Помилка при вході:", error);
          });
      }, 500),
    []
  );

  useEffect(() => {
    if (inputValue) {
      fetch(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, fetch]);

  return (
    <Box>
      <Autocomplete
        id="companies-search-demo"
        sx={{
          width: 300,
        }}
        getOptionLabel={(option) => option.name}
        options={options}
        noOptionsText="No companies found"
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(_, newValue) => {
          if (user?.mainUser && newValue) {
            navigate(`/companies/${newValue.itemNo}`);
          }
        }}
        // onChange={(_, newValue) => {
        //   if (newValue) {
        //     navigate(`/companies/${newValue.itemNo}`);
        //   }
        // }}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => (
          <TextField {...params} label="Search company" fullWidth />
        )}
      />
    </Box>
  );
};

export default Serch;
