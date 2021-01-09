export const initialState = {
    myCourse: [],
  };
  
  export function reducer(state, action) {
    switch (action.type) {
      case "ADD_COURSE":
        return {
          ...state,
          myCourse: [...state.myCourse, action.payload],
        };
      case "SET_COURSE":
        return {
          ...state,
          myCourse: action.payload,
        };
      case "DELETE_COURSE":
        return {
          ...state,
          myCourse: state.myCourse.filter((Course) => Course.id !== action.payload),
        };
      default:
        throw new Error();
    }
  }
  