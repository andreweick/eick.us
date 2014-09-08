'use strict';
//module.exports = build; //Exports build process for gulp

var Metalsmith          = require('metalsmith'),
    assets              = require('metalsmith-assets'),
    collections         = require('metalsmith-collections'),
    drafts              = require('metalsmith-drafts'),
    fileMetadata        = require('metalsmith-filemetadata'),
    htmlMinifier        = require('metalsmith-html-minifier'),
    markdown            = require('metalsmith-markdown'),
    metadata            = require('metalsmith-metadata'),
    permalinks          = require('metalsmith-permalinks'),
    sass                = require('metalsmith-sass'),
    tags                = require('metalsmith-tags'),
    templates           = require('metalsmith-templates'),
    neat                = require('node-neat'),
    swig                = require('swig'),
    swig_extend         = require('./swig-extend/index.js'),
    swig_extras         = require('swig-extras'),
    fs                  = require('fs');

// Homemade swig, swig-extend - filters
swig_extend.useFilter(swig, 'slice');
swig_extend.useFilter(swig, 'startswith');
swig_extend.useFilter(swig, 'where');
swig_extras.useFilter(swig, 'split');
swig_extras.useFilter(swig, 'markdown');

// Swig tags
var mySwig = new swig.Swig();
swig_extras.useTag(mySwig, 'case');
swig_extras.useTag(mySwig, 'switch');



var m = new Metalsmith(__dirname);
// source and destination are above this directory
  m.source('../content');
  m.destination('../_public');

// _build directory is generated via gulp, before metalsmith runs
  m.use(assets({
    source:      './_build/assets/', // relative to this working directory
    destination: './assets' // relative to the build (_public) directory
  }));

//catchall for small bits of content
  m.use(metadata({
    metadata:    'data/metadata.json'
  }));



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

  m.use(drafts()); // anything with front matter 'draft: true' doesn't get published. Or, with front matter set above, anything in the drafts folder

  // This seems to need to go before use.templates
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

  // m.use(tags({
  //       handle: 'tags',                  // yaml key for tag list in you pages
  //       path:'topics',                   // path for result pages
  //       template:'/list.html',    // template to use for tag listing
  //       sortBy: 'date',                  // provide posts sorted by 'date' (optional)
  //       reverse: true                    // sort direction (optional)
  //   }));

  // Assign the template engine
  m.use(templates({
    engine: 'swig',
    directory: 'layouts'
  }));

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
