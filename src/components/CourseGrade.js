import {useState} from "react"


const CourseGrade =({ courses })=>{
    function calculate(){
        let credit = 0, grade = 0.0
        
        courses.map(e =>{
            if(e.grade.value !== null){
                grade += e.grade.value*e.credit
                credit += e.credit
            }
        })
        
        if(credit === 0){
            return 0
        }
        return grade/credit
    }
    

    return (
        <div>
            {calculate().toFixed(2)}
        </div>
    )
}

export default CourseGrade;