// authController.js or userController.js
exports.allUsers = async (req, res, next) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await User.estimatedDocumentCount();
        const users = await User.find()
            .sort({ createdAt: -1 })
            .select("-password")
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(new ErrorResponse('Failed to load users', 500)); // Ensure error is passed to next
    }
};
//show singleuser
exports.singleUser=async(req,res,next)=>{
    try{

        const user=await User.findById(req,params,id)
  
        res.status(200).json({
            success:true,
           user
        });
        next()
     }catch(error){
return next(error)
    }
}
