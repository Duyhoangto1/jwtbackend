
import { deleteUser, getUserById, getUserList, registerUser, updateUser } from '../service/user.service.js';


const handleHome = (req, res) => {  
    // Render the home page
    // return res.send('Hello duyhoang');
    res.render("viewHome.ejs");
}
const handleUser = async (req, res) => {
    try {
        const users = await getUserList();
        console.log(users); // ✅ Log this to verify every user has a unique id
        res.render("viewUser.ejs", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
};

const handleLogin = (req, res) => {
    // Render the user page
    // model => get data from database
    res.render("viewLogin.ejs");
}

const handleRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await registerUser(username, email, password);
        // Redirect to /user to view the user list
        return res.redirect('/user');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Database error");
    }
};
const handleRegisterPage = (req, res) => {
    res.render("viewRegister.ejs");
};

const handleEditUserPage = async (req, res) => {
    const userId = req.params.id;
    try {
        // Giả sử bạn có hàm getUserById trong user.service.js
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Render trang chỉnh sửa, truyền user vào view
        res.render('viewEditUser.ejs', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
};

const handleEditUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;
    try {
        await updateUser(userId, username, email);
        return res.redirect('/user');
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
};

const handleDeleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await deleteUser(userId);
        return res.redirect('/user');
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
};
export {
    handleHome,
    handleUser,
    handleLogin,
    handleRegister,
    handleRegisterPage,
    handleEditUserPage,
    handleEditUser,
    handleDeleteUser
};
