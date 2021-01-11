import CourseForm from "./components/CourseForm";
import { createContext, useEffect, useReducer } from "react";
import CourseLists from "./components/CourseLists";
import CourseGrade from "./components/CourseGrade";
import { initialState, reducer } from "./utils/course-reducer";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ParticlesBg from 'particles-bg'

export const CourseContext = createContext({});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },

  },
  form: {
    maxWidth: 275,
  },
  gridList: {
    width: 300,
    height: 600,
  },
  
}));

function App() {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, initialState);

  //fetch course from localstroage
  function fetchCourse() {
    const localCourse = localStorage.getItem("myCourse");
    if (localCourse) {
      dispatch({
        type: "SET_COURSE",
        payload: JSON.parse(localCourse),
      });
    }
  }

  //use function fetchCourse() when page refresh and rendered
  useEffect(fetchCourse, []);

  useEffect(() => {
    localStorage.setItem("myCourse", JSON.stringify(state.myCourse));
  }, [state.myCourse]); //run when state.myCourse change


  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      <div >
      <ParticlesBg color="#ffffff" num={150} type="cobweb" bg={true}/>

        <h1 class="glow">
          GPA CALCULATOR
        </h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div align="center">
                <Card variant="outlined" className={classes.form}>
                  <Paper  elevation={3} />
                  <CourseForm courses={state.myCourse}/>
                </Card>
                <br/>
                <Card variant="outlined" className={classes.form}>
                  <Paper elevation={3} />
                <CourseGrade courses={state.myCourse}/>
                </Card>
              </div>

            </Grid>
            <Grid item xs={12} sm={6}>
              
              <GridList style={{paddingLeft:25}} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 100 }}>
                  <h3 class="small-glow">My courses</h3>
                </GridListTile>
                <CourseLists courses={state.myCourse} />
              </GridList>
            
            </Grid>
          </Grid>
          
      </div>
    </CourseContext.Provider>
  );
}

export default App;
