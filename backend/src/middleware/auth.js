import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {

    try {

        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login First"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

};

export default authUser;