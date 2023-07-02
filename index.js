const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, handleError } = require('./middlewares/errorHandler');
//Router
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport')
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const passportSetup = require('./utils/passport');
const rateLimitter = require('./utils/reqLimit');
const reviewRouter = require('./routes/reviewRoute');
const userRouter = require('./routes/userRoute');
const googleRouter = require('./routes/googleRoute');
const tutorialCatRouter = require('./routes/tutCatRoute');
const tutorialRouter = require('./routes/tutorialRoute');
const newsLetterRouter = require('./routes/newsLetterRoute');
const contactRouter = require('./routes/contactRoute');
const videoRouter = require('./routes/videoRoute');
const documentRouter = require('./routes/documentRoute');
const documentCatRouter = require('./routes/docCatRoute');
const blogCatRouter = require('./routes/blogCatRoute');
const blogRouter = require('./routes/blogRoute');
const videoCatRouter = require('./routes/videoCategoryRoute');
const courseCatRouter = require('./routes/courseCatRoute');
const courseRouter = require('./routes/courseRoute');
const workRouter = require('./routes/workRoute');
const projectCatRouter = require('./routes/projectCatRoute');
const projectRouter = require('./routes/projectRoute');
const sessionRouter = require('./routes/bookRoute');
const qnaRouter = require('./routes/qnaRoute');

dbConnect();

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "mysecret",
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            ttl: 12 * 60 * 60,
        }),
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {
    res.send(`<a href="http://localhost:4000/google">Đăng nhập với Google</a>`)
})
app.set("trust proxy", 1)
app.use("/api", rateLimitter(60 * 60 * 1000, "Hours", 50, "Only 50 Requests Allowed"))
app.use("/api/user", userRouter)
app.use("/", googleRouter)
app.use("/api/tutorial/category", tutorialCatRouter)
app.use("/api/tutorial", tutorialRouter)
app.use("/api/newsletter", newsLetterRouter)
app.use("/api/review", reviewRouter)
app.use("/api/contact", contactRouter)
app.use("/api/video", videoRouter)
app.use("/api/video/category", videoCatRouter)
app.use("/api/document", documentRouter)
app.use("/api/document/category", documentCatRouter)
app.use("/api/blog/category", blogCatRouter)
app.use("/api/blog", blogRouter)
app.use("/api/course/category", courseCatRouter)
app.use("/api/course", courseRouter)
app.use("/api/work", workRouter)
app.use("/api/project/category", projectCatRouter)
app.use("/api/project", projectRouter)
app.use("/api/book-session", sessionRouter)
app.use("/api/qna", qnaRouter)
app.use(notFound)
app.use(handleError)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});