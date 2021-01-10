import {useState} from "react"
import Typography from '@material-ui/core/Typography';


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
            <Typography variant="h3" component="h3">
            GPA: {calculate().toFixed(2)}
            </Typography>
            
        </div>
    )
}

export default CourseGrade;