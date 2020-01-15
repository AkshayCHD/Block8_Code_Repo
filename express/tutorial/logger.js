module.exports = (req, res, next) => {
    console.log("The request is recieved")
    next()
}