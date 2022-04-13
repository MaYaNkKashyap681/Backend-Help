const jwt = require("jsonwebtoken");
const key = "HelloBaby";

const verify_token = (req, res, next) => {
  const authheader = req.headers.token;

  if (authheader) {
    const token = authheader.split(" ")[1];
    jwt.verify(token, key, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    res.status(400).json({
      msg: "Token does Not exist",
    });
  }
};

const verifytokenandauthorization = (req,res,next) => {
    verify_token(req,res,() => {
       if(req.user.id == req.params.id){
           console.log(req.user.id)
           console.log(req.params.id)
           next();
       }
       else{
        res.status(403).json("You are not alowed to do that!");
       }
    })
}

// const verifyTokenAndAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//       if (req.user.isAdmin) {
//         next();
//       } else {
//         res.status(403).json("You are not alowed to do that!");
//       }
//     });
//   };

module.exports = {
  verify_token,
  verifytokenandauthorization,
};
