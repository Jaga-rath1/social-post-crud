let mongoose = require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/userpost");
};
main()
.then(()=>{
    console.log("Connection SuccessFull");
})
.catch((err)=>{
    console.log(err);
});
let postSchema = mongoose.Schema({
    username : String,
    content : String,
    likes : Number,
});
let Post = mongoose.model("Post",postSchema);
// Post.insertMany([
//     {
//         username : "Jagan Kumar Rath",
//         content : "Hello World",
//         likes : 95,
//     },
//     {
//         username : "Prajna Priyadarshini Panda",
//         content : "OG Pandu",
//         likes : 19,
//     },
//     {
//         username : "Pundu Madarchod",
//         content : "Ankita Panda Mg Boy ",
//         likes : 25,
//     },
//     {
//         username : "Bahubali Pandu",
//         content : "Nimda Kattapa ",
//         likes : 87,
//     },
// ]).then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// });
module.exports = Post;