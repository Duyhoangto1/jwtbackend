const handleHome = (req, res) => {  
    // Render the home page
    // return res.send('Hello duyhoang');
    res.render("viewHome.ejs");
}

const handleUser = (req, res) => {
    // Render the user page
    // model => get data from database
    res.render("viewUser.ejs");
}
module.exports = {
    handleHome,
    handleUser
}