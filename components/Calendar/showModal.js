import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteData } from "../redux/data";

import { successTost } from "../utils/reactTostify";

import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  CloseRounded,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";

const ShowModal = ({
  openShowModal,
  handleChangeOpenShowModal,
  selected,
  data,
  handleChangeOpen,
  setSelected,
}) => {
  // ===== useStates ======//
  const [item, setItem] = useState(data.filter((item) => item.id === selected));

  // ===== Redux ======//
  const dispatch = useDispatch();

  // ===== Handles ======//
  const handleDelete = (id) => {
    dispatch(deleteData(id));
    handleChangeOpenShowModal();
    successTost("Delete is Successfuly");
  };

  const handleEdit = (id) => {
    setSelected(id);
    handleChangeOpenShowModal();
    handleChangeOpen();
  };

  return (
    <Modal
      open={openShowModal}
      onClose={() => handleChangeOpenShowModal()}
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
          <Typography component="p" variant="body1" className="font-bold">
            {item[0].parent}
          </Typography>

          <Box>
            <IconButton onClick={() => handleEdit(item[0].id)}>
              <ModeEditOutlineOutlined color="warning" />
            </IconButton>
            <IconButton onClick={() => handleDelete(item[0].id)}>
              <DeleteOutlineOutlined color="error" />
            </IconButton>
            <IconButton onClick={() => handleChangeOpenShowModal()}>
              <CloseRounded color="error" />
            </IconButton>
          </Box>
        </Box>
        <Divider />

        <Grid container pt={3}>
          <Grid item xs={6}>
            <Typography component="p" variant="body2" pb={0.5}>
              {item[0].day}
            </Typography>
            <Typography component="p" variant="body2" className="font-bold">
              date
            </Typography>
            <Typography component="p" variant="body2" pt={2} pb={0.5}>
              {item[0].country}
            </Typography>
            <Typography component="p" variant="body2" className="font-bold">
              location
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" variant="body2" pb={0.5}>
              {item[0].time}
            </Typography>
            <Typography component="p" variant="body2" className="font-bold">
              time
            </Typography>

            <Box
              sx={{
                width: 25,
                height: 25,
                borderRadius: 2,
                backgroundColor: item[0].color,
                mt: 2,
                mb: 0.5,
              }}
            />
            <Typography
              component="p"
              variant="body2"
              className="font-bold"
              pb={1}
            >
              color
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <Typography component="p" variant="body2" className="font-bold" pt={2}>
          Describtion
        </Typography>
        <Typography component="p" variant="body2" pt={0.5}>
          {item[0].dic}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ShowModal;
