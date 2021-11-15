import jwt from 'jsonwebtoken';
import Users from '../models/userModel';

//인증 미들웨어
const auth = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ err: 'Invalid Authentication.' });

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: 'Invalid Authentication.' });

  const user = await Users.findOne({ _id: decoded.id });

  //인증 성공시 id, role, root 반환
  return { id: user._id, role: user.role, root: user.root };
};

export default auth;
