import { useContext, useState, useReducer } from "react";
import { CourseContext } from "../App";
import { CREDITS } from "../utils/credits";
import { GRADES } from "../utils/grades";
import {course_reducer, CourseJSON} from "../utils/add-course"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CourseForm = ({ courses }) => {
  const classes = useStyles();

  const { dispatch } = useContext(CourseContext);

  const [course, set_course] = useReducer(course_reducer, CourseJSON)
  const [idError, set_id_err] = useState("")
  const [nameError, set_name_err] = useState("")
 

  const addCourse = (e) => {
    e.preventDefault();
    if (course.name !== "" && course.subid !== "") {
      //add new course to state
      if(course.subid.length  !== 6){
        set_id_err("Subject ID must be 6 digits.")
      }else if(isNaN(course.subid)){
        set_id_err("Subject ID must be number.")
      }else{
        console.log(courses)
        if (courses.filter(e => (e.grade.name !== "W" && e.grade.name !== "F") && e.subid === course.subid).length > 0) {
          set_id_err("It already has this subject ID")
        }else{
          dispatch({
            type: "ADD_COURSE",
            payload: course,
          });
          //clear input
          console.log(course)
          set_course({
            type: "SET_NAME",
            name: "",
          })
          set_course({
            type: "SET_SUB_ID",
            subid: "",
          })
          set_name_err("")
          set_id_err("")
        }
      }
      
    } else {
      if(course.name === ""){
        set_name_err("You must enter the subject name.")
      }
      if(course.subid === ""){
        set_id_err("You must enter the subject ID.")
      }
    }
  };

  return (
    <form onSubmit={addCourse} className={classes.root}>
      <div >
        <h2>Add Course</h2>
        <div >
        <TextField id="outlined-basic" label="Subject Name" variant="outlined" value={course.name} onChange={(event) => set_course({type: "SET_NAME", name: event.target.value})}/> 
        <p id={"err"}>{nameError}&nbsp;</p>
        
        <TextField id="outlined-basic" label="Subject ID" variant="outlined" value={course.subid} onChange={(event) => set_course({type: "SET_SUB_ID", subid: event.target.value})}/>
        <p id={"err"}>{idError}&nbsp;</p>
        
        <InputLabel id="demo-mutiple-name-label">GRADE</InputLabel>
        <Select      
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"   
          onChange={e => {set_course({type: "SET_GRADE", grade: e.target.value});}}
          input={<Input />}
          MenuProps={MenuProps}
          
        >
          {
              GRADES.map(e => (
                <MenuItem key={e.name} value={JSON.stringify(e)}>
                {e.name}
            </MenuItem>
              ))}
        </Select>
        <br/>
        <InputLabel id="demo-mutiple-name-label">CREDIT</InputLabel>
        <Select 
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"  
          value={course.credit} 
          onChange={e => set_course({type: "SET_CREDIT", credit: e.target.value})}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {
              CREDITS.map(e => (
                <MenuItem key={e} value={e}>{e}</MenuItem>
              ))}
        </Select>
          
        </div>
        <div>
        <br/>
        <Button variant="contained" color="primary" type="submit">
          ADD &nbsp; <AddCircleRoundedIcon/>
        </Button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
