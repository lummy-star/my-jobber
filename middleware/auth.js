import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from "../errors/index.js"
 
const auth = async (req, res, next) =>{
    const {authorization }= req.headers
    console.log(authorization )
    // console.log(req.headers)
 if (!authorization  || !authorization.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication invalid') 
 }
 const token = authorization.split(' ')[1]
 try {
     const payload = jwt.verify(token, process.env.JWT_SECRET) 
     req.user = { userId: payload.userId }
     next() 
 } catch (error) {
 throw new UnAuthenticatedError('Authentication not found') 
 }
}

export default auth