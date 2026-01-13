const Mser=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SECRET_KEY="silambu";
    const register = async(req,res) => {
    try {

        const {username, password,role} = req.body;
        console.log(req.body)

        const dublicateUser = await Mser.findOne({username})

        if(dublicateUser){
            return res.status(401).json({message: "Username already exists"})
        }

        const hashpwd = await bcrypt.hash(password,10);
        const use = new Mser({username:username, password:hashpwd,role:role});
        console.log(use);
        const u = await use.save()

        return res.json({message : "Added user successfully " , data: u })

    } catch(err){
        res.json(err.message)
    }
    
}
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Mser.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successfully",
      token,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports={login,register}