import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    email: string;
}

export const generateToken = (user: { _id: string; email: string }): string => {
    const payload: JwtPayload = { id: user._id, email: user.email };
    const options = { expiresIn: '4h' };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string || "rasengan...", options);
    return token;
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string || "rasengan...") as JwtPayload;
    } catch (error) {
        return null;
    }
};
