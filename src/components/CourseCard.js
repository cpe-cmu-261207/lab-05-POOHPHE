import { useContext } from "react";
import { CourseContext } from "../App";

const CourseCard = ({ props }) => {
  const { dispatch } = useContext(CourseContext);

  const onRemoveCourse = () => {
    //dispatch delete action
    dispatch({
      type: "DELETE_COURSE",
      payload: props.id,
    });
  };

  return (
    <div >
      
      <div>ID: {props.subid}</div>
      <div class="flex-container">
        <div>Name: {props.name}</div>
        <div>Credit: {props.credit}</div>
        <div>Grade: {props.grade.name}</div>
        <button
          onClick={onRemoveCourse}
        >
          X
        </button> 
      </div>
    </div>
  );
};

export default CourseCard;