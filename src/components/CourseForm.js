import { useContext, useState, useReducer } from "react";
import { CourseContext } from "../App";
import { CREDITS } from "../utils/credits";
import { GRADES } from "../utils/grades";
import {course_reducer, CourseJSON} from "../utils/add-course"

const CourseForm = () => {
  
  const { dispatch } = useContext(CourseContext);

  const [course, set_course] = useReducer(course_reducer, CourseJSON)

  const addCourse = (e) => {
    e.preventDefault();
    if (course.name !== "" && course.id !== "") {
      //add new course to state
      if(course.subid.length  < 6){

      }else if(isNaN(course.subid)){

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
      }
      
    } else {
      alert("please add some course ?");
    }
  };

  return (
    <form onSubmit={addCourse} >
      <div >
        <h2>Add Course</h2>
        <div >
          
            <input 
            type="text"
            placeholder="Subject Name"
            value={course.name}
            onChange={(event) => set_course({type: "SET_NAME", name: event.target.value})}
          />

          <br/>
          <input
            maxlength='6'
            type="text"     
            placeholder="Subject ID"
            value={course.subid}
            onChange={(event) => set_course({type: "SET_SUB_ID", subid: event.target.value})}
          />
          <br/>
          <select  onChange={e => {set_course({type: "SET_GRADE", grade: e.target.value});}}>
            {
              GRADES.map(e => (
                <option value={JSON.stringify(e)}>{e.name}</option>
              ))
            }
          </select>
          <br/>
          <select value={course.credit} onChange={e => set_course({type: "SET_CREDIT", credit: e.target.value})}>
            {
              CREDITS.map(e => (
                <option value={e}>{e}</option>
              ))
            }
          </select>
        </div>
        <div>
          <button
            type="submit"
          >
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
