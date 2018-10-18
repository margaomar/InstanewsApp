// Require Gulp first!
const gulp = require("gulp"); //Always needed to define this constant to require gulp
// This is a very basic Gulp task,
// with a name and some code to run
// when this task is called:
gulp.task("hello", function(done) {
  console.log("Hello world"); //here what do you want to do
  done(); // always finish like this, it´s needed.
});// this was a basic task
// go to the console to run this task with: gulp default
// this "default" name is special because is used by the program by default for everyone, in terms that if you just type: gulp, it´ll search and run a "default" task.
gulp.task("anotherTask", function(done){
    console.log("running the another task");
    done();
});
////////////

// Now that we've installed the uglify package we can require it:
const uglify = require("gulp-uglify"),
  rename = require("gulp-rename");
gulp.task("default", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

//browser-sync --> refresh the browser every time you save
var browserSync = require('browser-sync').create();

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

const eslint = require('gulp-eslint');
 
gulp.task('gulp-eslint', () => {
    return gulp.src(['./js/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

