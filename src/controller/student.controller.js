const { Student, Course } = require("../models")

exports.createStudent=async (req,res)=>{
   try{
      const {name,roll,email,className,courses}=req?.body
      const studentDetail=new Student({
        name,roll,className,email
      })
      const data=await studentDetail.save()
      if(data){
          const courseDetail=new Course({
            name:courses?.name,
            student_id:data?._id
          })
          const course=await courseDetail.save() 
          if(course){

            return res.status(200).json({
                success:true,
                data:{
                    ...data?._doc,
                    course:{
                        ...course?._doc
                    }
                }
            })
          }else{
             return res.status(200).json({
                success:false,
                message:"Something went wrong with Courses"
             })
          }
      }else{
        return res.status(200).json({
            success:false,
            message:"Something went wrong with Student"
         })
      }

   }catch(err){

   }
}
exports.getStudents=async (req,res)=>{
    try{
        const students = await Student.aggregate([
            {
                $lookup: {
                    from: 'courses',           // Name of the Course collection
                    localField: '_id',        // Student _id
                    foreignField: 'student_id', // Field in Course referencing Student's _id
                    as: 'student_courses'      // The alias for the joined courses
                }
            },
            {
                $unwind: {
                    path: '$student_courses',  // Unwind to flatten the courses array
                    preserveNullAndEmptyArrays: true // Keep students even if they don't have courses
                }
            },
            {
                $lookup: {
                    from: 'colleges',            // Name of the Colleges collection
                    localField: 'student_courses._id', // Reference course_id in courses
                    foreignField: 'course_id',   // Field in College collection referencing course_id
                    as: 'student_colleges'       // The alias for the joined colleges
                }
            },
            {
                $unwind: {
                    path: '$student_colleges',  // Unwind to flatten the courses array
                    preserveNullAndEmptyArrays: true // Keep students even if they don't have college
                }
            },
            {
                // $project: {
                //     _id: 1,                    // Include the _id field from the Student collection
                //     name: 1,                   // Include the name field from the Student collection
                //     'student_courses._id': 1,  // Include the _id field from the Course collection
                //     'student_courses.name': 1, // Include the name field from the Course collection
                //     'student_colleges._id': 1      // Include the entire colleges array for the course
                // }
                $project: {
                    _id: 1,                    // Include the _id field from the Student collection
                    name: 1,                   // Include the name field from the Student collection
                    'student_courses._id': 1,  // Include the _id field from the Course collection
                    'student_courses.name': 1, // Include the name field from the Course collection
                    'student_colleges': 1      // Include the entire colleges array for the course
                }
            }
        ]);
        return res.status(200).json({
            success: true,
            data: students
        });
    }catch(err){
      console.log(err)
    }
 }