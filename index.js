'use strict';
//module.exports = build; //Exports build process for gulp
var Metalsmith          = require('metalsmith'),
    collections         = require('metalsmith-collections'),
    drafts              = require('metalsmith-drafts'),
    fileMetadata        = require('metalsmith-filemetadata'),
    htmlMinifier        = require('metalsmith-html-minifier'),
    markdown            = require('metalsmith-markdown'),
    metadata            = require('metalsmith-metadata'),
    permalinks          = require('metalsmith-permalinks'),
    sass                = require('metalsmith-sass'),
    templates           = require('metalsmith-templates'),
    uglify              = require('metalsmith-uglify'),
    neat                = require('node-neat'),
    swig                = require('swig'),
    swig_extend         = require('./swig-extend/index.js'),
    swig_extras         = require('swig-extras');
    //fs                  = require('fs');

    swig_extend.useFilter(swig, 'slice');
    swig_extend.useFilter(swig, 'startswith');
    swig_extend.useFilter(swig, 'where');
    swig_extras.useFilter(swig, 'split');
    swig_extras.useFilter(swig, 'markdown');

    var mySwig = new swig.Swig();
    swig_extras.useTag(mySwig, 'case');
    swig_extras.useTag(mySwig, 'switch');

    // logFilesMap lets us view the file objects that metalsmith creates.
    // var logFilesMap = function(files, metalsmith, done) {
    //     Object.keys(files).forEach(function (file) {
    //         var fileObject = files[file];

    //         console.log("key -------> ", file);
    //         console.log("value -----> ", fileObject);
    //     });
    // };


//===== ASSETS =====//

Metalsmith(__dirname)
  .source('assets/')
  .destination('_public/assets/')
  .use(sass({
    OutputStyle: "expanded",
     includePaths: neat.includePaths,
     outputDir: 'css',
    }))
   .use(uglify({
      filter:[
        '_bower_components/jquery/jquery.min.js',
        '_bower_components/imagesloaded/imagesloaded.pkgd.min.js',
        '_bower_components/masonry/dist/masonry.pkgd.min.js',
        'js/*.js'
      ],
      includeSources: false,
      preserveComments: true,
      concat: 'js/min/scripts.min.js'
      // sourceMapName: function (name) {
      //   return name.replace('.js', '.min.js');
      // }
    }))
  .build(function(err) {
    if (err) {
      throw err;
    }
  });

//===== Site =====//

var m = new Metalsmith(__dirname);

  m.source('_content');
  m.destination('_public');

  m.use(metadata({
    metadata:    'data/metadata.json'
  }));

  m.use(drafts());

  // Assign templates automatically to files and other nice configurations for documents
  m.use(fileMetadata([
    {pattern: "drafts/*.md",       metadata: { "draft": "true" }}, //anything in the drafts folder doesn't get published
    {pattern: "about.md",          metadata: { "template": "page.html" }},
    {pattern: "about/contact.md",  metadata: { "include_on_page":  "partials/form-contact.html", "template": "page.html"}},
    {pattern: "family/*.md",       metadata: { "template": "post.html" }},
    {pattern: "history/*.md",      metadata: { "template": "post.html" }},
    {pattern: "snapshot/*.md",     metadata: { "template": "post.html" }},
  ]));

  // Create Collections
  m.use(collections({
    about:    { pattern: 'about/*.md',     sortBy: 'date',  reverse: true },
    family:   { pattern: 'family/*.md',    sortBy: 'date',  reverse: true },
    history:  { pattern: 'history/*.md',   sortBy: 'date',  reverse: true },
    snapshot: { pattern: 'snapshot/*.md',  sortBy: 'date',  reverse: true },
  }));

  // This seems to need to go before template assignment
  m.use(markdown({
    gfm: true,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  }));

  // this appears to need to go after use.markdown and before the use.templates
  m.use(permalinks({
    pattern: ':collection/:slug',
    relative: false
  }));

  // Assign the template engine
  m.use(templates({
    engine: 'swig',
    directory: './layouts'
  }));

  // In production, we should minify our HTML for performance.
  //m.use(htmlMinifier());

  m.build(function(err){
    if (err) throw err;
  });

  //USE THIS TO BUILD VIA GULPFILE.JS
// function build(done) {
//   m.build(function(err) {
//     if (err) return done(err);
//     done();
//   });
// }

//m.use(logFilesMap);
