import { useContext } from "react";
import { CourseContext } from "../App";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles({
  root: {
    width: 275
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CourseCard = ({ props }) => {
  const classes = useStyles();
  const { dispatch } = useContext(CourseContext);

  const onRemoveCourse = () => {
    //dispatch delete action
    dispatch({
      type: "DELETE_COURSE",
      payload: props.id,
    });
  };

  return (
    <GridListTile cols={1}>

    <Paper elevation={3} />
    <Card className={classes.root} variant="outlined">
      <CardContent>
        
        <Typography variant="h5" component="h2">
          ID: {props.subid}
        </Typography>
        
        <Typography variant="h6" component="h4">
          Subject Name: {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Grade: {props.grade.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Credit: {props.credit}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onRemoveCourse} variant="contained" color="secondary">Delete <DeleteForeverRoundedIcon /></Button>
      </CardActions>
    </Card>
    </GridListTile>
  );
};

export default CourseCard;