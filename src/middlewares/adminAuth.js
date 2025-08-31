const adminAuth = (req, res, next) => {
    console.log("Inside admin auth request")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized!!");
    }

}
module.exports = {
    adminAuth
}