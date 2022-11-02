import { ThemeProvider } from "@mui/material";
import theme from "../components/Theme";
import { ToastContainer } from "react-toastify";
import { wrapper } from "../components/redux/store/configureStore";

import "react-day-picker/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import "../public/css/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer toastClassName="font-medium" autoClose={3000} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
