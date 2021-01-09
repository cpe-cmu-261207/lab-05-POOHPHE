import CourseForm from "./components/CourseForm";
import { createContext, useEffect, useReducer } from "react";
import CourseLists from "./components/CourseLists";
import CourseGrade from "./components/CourseGrade";
import { initialState, reducer } from "./utils/course-reducer";

export const CourseContext = createContext({});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetch todos from localstroage
  function fetchCourse() {
    const localCourse = localStorage.getItem("myCourse");
    if (localCourse) {
      dispatch({
        type: "SET_COURSE",
        payload: JSON.parse(localCourse),
      });
    }
  }

  //use function fetchTodos() when page refresh and rendered
  useEffect(fetchCourse, []);

  useEffect(() => {
    localStorage.setItem("myCourse", JSON.stringify(state.myCourse));
  }, [state.myCourse]); //run when state.myTodos change

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      <div >
        <h1 s>Todos</h1>

        <CourseLists courses={state.myCourse} />

        <CourseForm />
        <CourseGrade courses={state.myCourse}/>
      </div>
    </CourseContext.Provider>
  );
}

export default App;
