import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addData, updateData } from "../redux/data";

import ColorBox from "material-ui-color-picker";
import { format } from "date-fns";
import axios from "axios";

import { errorTost, successTost } from "../utils/reactTostify";

import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ModalAdd = ({ open, handleChangeOpen, value, selected, data }) => {
  // ===== useStates ======//
  const [time, setTime] = useState(value);
  const [parent, setParent] = useState("");
  const [dic, setDic] = useState("");
  const [color, setColor] = useState("#f6d58b");
  const [country, setCountry] = useState("");

  // ===== Redux ======//
  const dispatch = useDispatch();

  // ===== useEffects ======//
  useEffect(() => {
    if (!selected) {
      setTime(value);
      setParent("");
      setDic("");
      getGeoInfo();
    } else {
      const newData = data.filter((item) => item.id === selected);
      setParent(newData[0].parent);
      setDic(newData[0].dic);
      setCountry(newData[0].country);
    }
  }, [open]);

  // ===== Handles ======//
  const handleChange = (newValue) => {
    setTime(newValue.$d);
  };

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountry(`${data.country_name} , ${data.city}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    if (time && parent && dic) {
      if (!selected) {
        const formats = format(value, "Y/M/d");
        const times = format(time, "H:m");
        const id = 1 + Math.random() * (10000000000 - 1);
        const object = {
          id,
          dateFnd: new Date(),
          day: formats,
          time: times,
          parent,
          dic,
          color,
          country,
        };
        dispatch(addData(object));

        successTost("It was successfully built");
      } else {
        const object = {
          id: selected,
          parent,
          dic,
          color,
          country,
        };
        dispatch(updateData(object));

        successTost("It was successfully Edit");
      }
      handleChangeOpen();
    } else {
      errorTost("Please fill in all the fields!");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => handleChangeOpen()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        className="style-modal scroll-height"
        sx={{ width: { xs: "80%", md: "40%" } }}
        p={3}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={1}
        >
          <Typography component="p" variant="body1">
            {!selected ? "Add Paranet" : "Edit Paranet"}
          </Typography>
          <IconButton onClick={() => handleChangeOpen()}>
            <CloseRoundedIcon color="error" />
          </IconButton>
        </Box>
        <Divider />

        <Box py={2} component="form" noValidate>
          {!selected ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                value={time}
                onChange={handleChange}
                disabled={selected ? true : false}
                renderInput={(params) => (
                  <TextField {...params} fullWidth color="secondary" />
                )}
              />
            </LocalizationProvider>
          ) : (
            ""
          )}

          <TextField
            placeholder="Parent..."
            value={parent}
            fullWidth
            color="secondary"
            sx={{ my: 2 }}
            autoFocus
            onChange={(e) => setParent(e.target.value)}
          />
          <TextField
            placeholder="diceripatin"
            value={dic}
            fullWidth
            color="secondary"
            sx={{ mb: 2 }}
            onChange={(e) => setDic(e.target.value)}
          />

          <TextField
            placeholder="address"
            value={country}
            fullWidth
            color="secondary"
            sx={{ mb: 2 }}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 30,
                borderRadius: 2,
                backgroundColor: color,
                mr: 1,
              }}
            />
            <ColorBox
              name="color"
              value={color}
              onChange={(color) => setColor(color)}
              color="secondary"
              label="select Color"
            />
          </Box>

          <Button
            color="secondary"
            variant="contained"
            fullWidth
            sx={{ color: "#fff" }}
            onClick={() => handleSubmit()}
          >
            {!selected ? "Add" : "Edit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
