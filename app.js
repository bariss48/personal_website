const express = require('express');
const app = express();
//routes
const blogs_route = require('./routes/blogs');
const auth_route = require('./routes/auth');
const mainRoute = require('./routes/main');
const projects_route = require('./routes/projects');
const User = require('./models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

//routes end
const method_override = require('method-override');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const connect_db = require('./config/db');
const cors = require('cors');
dotenv.config({ path: './config/config.env' });

connect_db();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended : true }));

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.json({
    type: ["application/json", "text/plain"]
}));
app.use(cors());

app.use(expressSession({
    secret: "sadasfaslhfalsjfjlasfjlowqjfloaqogğkqagilpassaşfliawktşpkageksgnajkgadlgnbadjtwrqodsalkfalksjf",
    resave: false,
    saveUninitialized: false
    // using store session on MongoDB using express-session + connect
}));
app.use(method_override('_method'));
// connect flash

app.use(passport.initialize());
app.use(passport.session());
app.use(body_parser.urlencoded({ extended : true }));
app.use(cookieParser());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//state config
app.use((req,res,next) => {
    res.locals.user = req.user;
    next();
});


app.use("/",mainRoute);
app.use("/",auth_route);
app.use("/blogs",blogs_route);
app.use("/projects",projects_route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server online in ${process.env.NODE_ENV} mode on port ${PORT}`));