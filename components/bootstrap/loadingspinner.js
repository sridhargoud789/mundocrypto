import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: "9999 !important",
    color: "#fff",
  },
}));

const LoadingSpinner = (props) => {
  const classes = useStyles();
  return (
    <Backdrop className="muiLoader" open={props.showLoading}>
      <CircularProgress
        color="inherit"
        title="Submitting exam results... / Entregando tu examen..."
      />
      {props.text && (
        <div> Submitting exam results... / Entregando tu examen...</div>
      )}
    </Backdrop>
  );
};

export default LoadingSpinner;
