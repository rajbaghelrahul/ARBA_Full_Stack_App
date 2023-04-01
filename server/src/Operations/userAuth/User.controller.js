
const UserModel = require('./User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.LoginController = async (req, res) => {    
    const { username, password } = req.body;
    try {        
        const userpersent = await UserModel.findOne({ userName: username });
        console.log(userpersent)        
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect username' });
        }        
        const isPasswordCorrect = await bcrypt.compare(password, userpersent.password);
        if (!isPasswordCorrect) {            
            return res.status(401).send({ message: 'Incorrectpassword' });
        }        
        const token = jwt.sign(
            {
                email: userpersent.email,
                fullName: userpersent.fullName,
                userName: userpersent.userName,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7 days' }
        );        
        return res.status(200).send({ token, userpersent, message: 'Login successful' });
    } catch (error) {        
        return res.status(500).send(error.message);
    }
};

exports.RegisterController = async (req, res) => {    
    const { fullName, userName, email, password, avatar } = req.body;
    try {        
        const exsistinguser = await UserModel.findOne({ email });
        if (exsistinguser) {            
            return res.status(409).send({
                message: 'User already exists',
            });
        }        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
            avatar: avatar
        });        
        return res.status(201).send({
            user: newUser,
            message: 'User has register Successfully !',
        });
    } catch (error) {        
        return res.status(500).send(error.message);
    }
};


exports.UpdatePasswordController = async (req, res) => {    
    const { oldPassword, newPassword } = req.body;
    let { token } =req.headers;
    let decode=jwt.decode(token,process.env.JWT_SECRET);
    try {        
        const user = await UserModel.findOne({ email: decode.email });
        if (!user) {            
            return res.status(404).send({ message: 'User not found' });
        }        
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect) {            
            return res.status(401).send({ message: 'Incorrect old password' });
        }        
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();        
        return res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {        
        return res.status(500).send(error.message);
    }
};


exports.ProfileUpdateController = async (req, res) => {    
    const { fullName, avatar } = req.body;
    let {token}=req.headers;
    let decode=jwt.decode(token,process.env.JWT_SECRET);

    try {        
        const user = await UserModel.findOne({email:decode.email});
        if (!user) {            
            return res.status(404).send({ message: 'User not found' });
        }        
        user.fullName = fullName;
        user.avatar = avatar;
        await user.save();        
        return res.status(200).send({
            user: user,
            message: 'Profile updated successfully',
        });
    } catch (error) {        
        return res.status(500).send(error.message);
    }
};