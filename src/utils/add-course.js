export const CourseJSON = {id:"", name:"", credit:1, grade: { name: "A",    value: 4,  },subid:""}
export function course_reducer(state, action){
    
    switch(action.type){
      case "SET_NAME":
        return {
          ...state, name: action.name,
          id: Date.now(),
          credit: state.credit,
          grade: state.grade,
          subid: state.subid,
        }
      case "SET_CREDIT":
        return {
          ...state, credit: action.credit,
          grade: state.grade,
          name: state.name,
          id: Date.now(),
          subid: state.subid,
        }
      case "SET_GRADE":
        return {
          ...state, grade: JSON.parse(action.grade),
          name: state.name,
          id: Date.now(),
          credit: state.credit,
          subid: state.subid,
        }
        case "SET_SUB_ID":
          return {
            ...state, subid: action.subid,
            name: state.name,
            id: Date.now(),
            credit: state.credit,
            grade: state.grade
          }
      default:
        throw new Error()
    }
  }