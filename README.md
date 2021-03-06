# Gulp Build - - Treehouse tech degree project 8

## The build process must fulfill the following criteria:

- [x] Concatenate and minify the JavaScript files
- [x] Compile SCSS into CSS in a concatenated and minified file
- [x] Generate JavaScript and CSS source maps
- [x] Compress any JPEG or PNG files
- [x] All output for the build process should be in a dist folder for distribution or deployment.

## Before you start

Download the project files. We've supplied a project folder containing the following files for you to use:
- [x] index.html -- the web page for the project
- [x] images directory -- contains jpg and png images
- [x] sass directory -- contains various Sass files
- [x] js directory -- contains a global.js file and a subdirectory -- circle -- with two other helper JavaScript files
- [x] icons directory -- you can ignore this folder in your build process, but you will need to copy this folder over to the dist directory for the final build

## Project Instructions

- [x] Run the npm install command to install all of the dependencies for the build process.
- [x] Run the gulp scripts command at the command line to concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.
- [x] Run the gulp styles command at the command line to compile the project’s SCSS files into CSS, then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.
- [x] Run the gulp scripts or gulp styles commands at the command line, source maps are generated for the JavaScript and CSS files respectively.
- [x] Run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.
- [x] Run the gulp clean command at the command line to delete all of the files and folders in the dist folder.
- [x] Run the gulp build command at the command line to run the clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.
- [x] Run the gulp command at the command line to run the build task and serve my project using a local web server.


## Extra Credit
- [x] Run the default gulp command, it should continuously watch for changes to any .scss file in my project.
- [x] When there is a change to one of the .scss files, the gulp styles command is run and the files are:
- [x] compiled,
- [x] concatenated, and
- [x] minified
- [x] to the dist folder.
- [x] My project should then reload in the browser, displaying the changes.      


## Future additions
- [x] Currently no additions

## Installation

Download or clone the repo
```sh
$ git clone https://github.com/darryldriedger/Gulp-Build.git
```
Install Dependencies
````sh
$ cd Gulp-Build
$ npm install
````
