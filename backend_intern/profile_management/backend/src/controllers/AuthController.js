import * as AuthService from '../services/AuthService.js';

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    console.log('===================req.body=================');
    console.log(req.body);
    console.log('===================req.body=================');
    const result = await AuthService.googleLogin(idToken);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    
  }
};