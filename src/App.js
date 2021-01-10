import CourseForm from "./components/CourseForm";
import { createContext, useEffect, useReducer } from "react";
import CourseLists from "./components/CourseLists";
import CourseGrade from "./components/CourseGrade";
import { initialState, reducer } from "./utils/course-reducer";

export const CourseContext = createContext({});

function App() {
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
        

        <div class="grid-container">
          <div class="item1"><h1 s>GPA Calculator</h1></div>
          <div class="item2">
            <CourseForm />
            <CourseGrade courses={state.myCourse}/>
          </div>
          <div class="item3">
            <CourseLists courses={state.myCourse} />
          </div>  
          
        </div>
        
          


          
        
        
      
        

        
        
        
      </div>
    </CourseContext.Provider>
  );
}

export default App;
