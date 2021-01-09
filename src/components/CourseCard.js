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
      <div >
        <p>Name: {props.name}</p><p>ID: {props.id}</p><p>Credit: {props.credit}</p><p>Grade: {props.grade.name}</p>
      </div>

      <div >
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
