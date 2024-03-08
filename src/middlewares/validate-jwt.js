import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    const user = await User.findById(uid);
    if(!user){
      return res.status(401).json({
        msg: 'User not exists on database'
      })
    }

    if(!user.state){
      return res.status(401).json({
        msg: 'Invalid token - user with status: false'
      })
    }

    req.user = user;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token not valid",
      });
  }
}