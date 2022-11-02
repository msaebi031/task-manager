import { useState } from "react";
import { useSelector } from "react-redux";

import { format, formatDistance } from "date-fns";
import { DayPicker } from "react-day-picker";

import { Box, Divider, IconButton, Typography } from "@mui/material";
import {
  AddCircleOutline,
  LocationOnOutlined,
  AccessTimeOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";

import ModalAdd from "./modalAdd";
import ShowModal from "./showModal";

const Calendar = () => {
  // ===== useStates ======//
  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [selected, setSelected] = useState("");

  // ===== Redux ======//
  const { data } = useSelector((state) => state.data);

  // ===== Handles ======//
  const handleChangeOpen = () => {
    setOpen(!open);
  };

  const handleChangeOpenShowModal = () => {
    setOpenShowModal(!openShowModal);
  };

  const handleShowModal = (id) => {
    setSelected(id);
    handleChangeOpenShowModal();
  };

  // ===== Format && Search ======//
  const formats = format(value, "Y/M/d");
  const filtered = data.filter((entry) =>
    Object.values(entry).some(
      (val) => typeof val === "string" && val.includes(formats)
    )
  );

  return (
    <Box className="bg-calendar" py={1} mt={2}>
      <DayPicker mode="single" selected={value} onSelect={setValue} />
      <Divider variant="middle" />

      {/* Map For Parent */}
      {filtered.length > 0 ? (
        <Box>
          {filtered.map((item, index) => (
            <Box
              className="box-alert"
              key={index}
              sx={{ backgroundColor: item.color }}
              my={2}
              mx={2}
              onClick={() => handleShowModal(item.id)}
            >
              <Box display="flex" alignItems="center">
                <Typography
                  component="p"
                  variant="subtitle1"
                  className="font-bold"
                  flexGrow="1"
                >
                  {item.parent} .{" "}
                  <span className="font-medium">
                    {formatDistance(new Date(item.dateFnd), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" py={1}>
                <LocationOnOutlined fontSize="small" />
                <Typography component="span" variant="body2">
                  {item.country}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <CalendarTodayOutlined fontSize="small" />
                <Typography
                  component="span"
                  variant="body2"
                  flexGrow="1"
                  pl={0.5}
                >
                  {item.day}
                </Typography>

                <AccessTimeOutlined fontSize="small" />
                <Typography component="span" variant="body2" pl={0.5}>
                  {item.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography component="p" variant="h6" pt={2}>
          There are no items to display!
        </Typography>
      )}
      {/* Map For Parent */}

      {/* Add parent */}
      <IconButton
        onClick={() => {
          handleChangeOpen();
          setSelected("");
        }}
      >
        <AddCircleOutline fontSize="large" color="secondary" />
      </IconButton>
      {/* Add parent */}

      {/* Modals */}
      <ModalAdd
        open={open}
        handleChangeOpen={handleChangeOpen}
        value={value}
        selected={selected}
        data={data}
      />
      {openShowModal ? (
        <ShowModal
          openShowModal={openShowModal}
          handleChangeOpenShowModal={handleChangeOpenShowModal}
          selected={selected}
          setSelected={setSelected}
          data={data}
          handleChangeOpen={handleChangeOpen}
        />
      ) : (
        ""
      )}
      {/* Modals */}
    </Box>
  );
};

export default Calendar;
