const gulp = require('gulp'),
  prettyError = require('gulp-prettyerror'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  eslint = require('gulp-eslint');

  //browser-sync --> refresh the browser every time you save
var browserSync = require('browser-sync').create();
// This is a very basic Gulp task,
// with a name and some code to run
// when this task is called:

//gulp.task("hello", function(done) {
  //console.log("Hello world"); //here what do you want to do
  //done(); // always finish like this, it´s needed.
//});// this was a basic task
// go to the console to run this task with: gulp default
// this "default" name is special because is used by the program by default for everyone, in terms that if you just type: gulp, it´ll search and run a "default" task.
//gulp.task("anotherTask", function(done){
    //console.log("running the another task");
    //done();
//});
////////////

// Now that we've installed the uglify package we can require it:

 
gulp.task('gulp-eslint', () => {
    return gulp.src(['./js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

// Static server
gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(['index.html', 'build/css/*.css', 'build/js/*.js'])
    .on('change', browserSync.reload); 
});


gulp.task("default", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});
