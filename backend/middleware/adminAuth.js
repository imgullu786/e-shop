import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({success:false,message:"Unauthorized Admin"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Unauthorized Admin"})
        }
        next()
    } catch (error) {
        console.log("Error in admin auth middleware : ", error.message);
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth