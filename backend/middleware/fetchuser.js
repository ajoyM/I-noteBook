const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    let token = req.header('auth-token');
    if (!token) {
        res.status(501).send({error: "please add valid access token for authentication"})
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                res.status(401);
                 throw new error("user is not authorized")
            }
            req.user = decoded.user;
            next();
        })

    } catch(error) {
       res.status(401).send({error: 'please add valid access token for authentication'})
    }
}

module.exports = fetchuser;