var express = require('express');
var fs = require('fs');
const pdf = require('pdf-parse');
const EventSource = require('eventsource');
const he = require('he');

//var {readFilesHandler} = require("../public/javascripts/filecontentReader");
const formidable = require("formidable");

var router = express.Router();

var stringPrompt = "";

const prompt = `In response to the spike in COVID-19 cases in parts of the world, India is shoring up its defences against the virus. India's Ministry of Health and Family Welfare has noted the spike of COVID cases in China, Brazil, Japan, US and is deploying a series of measures. Officials stress that there is no need for panic, and that India’s COVID numbers are currently at their lowest since the pandemic began, and have been in a steady decline for the past 5 months. China is grappling with a possible COVID-19 comeback. The spike has been noted to take effect since China eased its zero-COVID restrictions last month.`;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { promptStr: prompt, articleText:"" });
  stringPrompt = Buffer.from(req.query.ai, 'base64');


});



router.post('/fileupload', function (req, res, next) {

  const APIKEY = process.env.API_KEY;
  const ENDPOINT = 'https://api.openai.com/v1/completions';

  var form = new formidable.IncomingForm().parse(req).on('file', function(name, file) {


    let filePath = file.filepath;
   // let filebuffer = data;
    let filename = file.newFilename;
    fs.readFile(filePath, (err, data) => {

      pdf(data).then(function(data) {

        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);
        console.log(data.text.length);

        const params1 = {
          method: 'post',
          contentType: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKEY}`,
          },
          body: JSON.stringify({
           // stream:true,
            model: 'text-davinci-003',
            prompt: stringPrompt !== ""?stringPrompt+": ":"Write a 500 word news article from this text: "+data.text,
            max_tokens: 812,
          }),
//          https: {rejectUnauthorized: false}
        };







/*

         fetch(ENDPOINT, params1)
            .then((response) =>

            {

              console.log('response came');

              var es = new EventSource(ENDPOINT, bodyonly);
              es.onerror = function (err) {
                if (err) {
                  if (err.status === 401 || err.status === 403) {
                    console.log(`not authorized ${err.status}`);
                  }
                }else{

                  console.log('another error');

                }
              };

              es.readyState = (e,s)=>{
                console.log(`Event Ready`);

              };

              es.onmessage = (e) => {

                console.log(`Event msd ${e.data}`);
              }

            });
*/

         fetch(ENDPOINT, params1)
            .then((response) => response.json())
            .then((data) => {
              console.log(data.choices[0].text);

              var parsedArticleText = he.decode(data.choices[0].text);
              res.render('index', {promptStr:prompt, articleText: parsedArticleText });

            });


      });
    });

    console.log('Got file:', file);
  }) .on('field', function(name, field) {
    console.log('Got a field:', name);
  })
      .on('error', function(err) {
        next(err);
      })
      .on('end', function() {
      });
  var filecontent = "";

/*
  form.parse(req, function (err, fields, files) {
    console.log(`File err ${err}`)
    console.log(`File fields ${fields}`)
    console.log(`File files ${files.filetoupload.path}`)

  });
  */

 // renderPage(req, res).then(r => res.render('index', { promptStr: prompt }));
 // res.render('index', { promptStr: prompt });


});

module.exports = router;
