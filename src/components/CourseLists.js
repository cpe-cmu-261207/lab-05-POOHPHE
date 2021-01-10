
import CourseCard from "./CourseCard";  
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


const CourseLists = ({ courses }) => {
  const classes = useStyles();

  return(
  <>
     {courses.map((course) => (
      <CourseCard key={course.id} props={course} />
    ))} 
    
  </>
  )
}

export default CourseLists;