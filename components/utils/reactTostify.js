import { toast } from "react-toastify";

export const successTost = (text) =>
  toast.success(text, {
    position: "bottom-left",
  });

export const errorTost = (text) =>
  toast.error(text, {
    position: "bottom-left",
  });
