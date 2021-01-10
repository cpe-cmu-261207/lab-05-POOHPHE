
import CourseCard from "./CourseCard";  



const CourseLists = ({ courses }) => (
  <div>
     {courses.map((course) => (
      <CourseCard key={course.id} props={course} />
    ))} 
    
  </div>
);

export default CourseLists;