import { useContext, useState, useReducer } from "react";
import { CourseContext } from "../App";
import { CREDITS } from "../utils/credits";
import { GRADES } from "../utils/grades";

const CourseForm = () => {
  
  const { dispatch } = useContext(CourseContext);

  const CourseJSON = {id:"", name:"", credit:1, grade: { name: "A",    value: 4,  }}
  function course_reducer(state, action){
    
    switch(action.type){
      case "SET_NAME":
        return {
          ...state, name: action.name,
          id: state.id,
          credit: state.credit,
          grade: state.grade
        }
      case "SET_ID":
        return {
          ...state, id: action.id,
          credit: state.credit,
          grade: state.grade,
          name: state.name
        }
      case "SET_CREDIT":
        return {
          ...state, credit: action.credit,
          grade: state.grade,
          name: state.name,
          id: state.id
        }
      case "SET_GRADE":
        return {
          ...state, grade: JSON.parse(action.grade),
          name: state.name,
          id: state.id,
          credit: state.credit
        }
      default:
        throw new Error()
    }
  }
  const [course, set_course] = useReducer(course_reducer, CourseJSON)




  const addCourse = (e) => {
    e.preventDefault();
    if (course.name !== "" && course.id !== "") {
      //add new todo to state
      
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
        type: "SET_ID",
        id: "",
      })
    } else {
      alert("please add some todo ?");
    }
  };

  return (
    <form onSubmit={addCourse} >
      <div >
        <div >
          <input
            type="text"
            
            placeholder="new todo"
            value={course.name}
            onChange={(event) => set_course({type: "SET_NAME", name: event.target.value})}
          />
          <input
            type="text"
            
            placeholder="new todo"
            value={course.id}
            onChange={(event) => set_course({type: "SET_ID", id: event.target.value})}
          />
          <select  onChange={e => {set_course({type: "SET_GRADE", grade: e.target.value});}}>
            {
              GRADES.map(e => (
                <option value={JSON.stringify(e)}>{e.name}</option>
              ))
            }
          </select>
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
