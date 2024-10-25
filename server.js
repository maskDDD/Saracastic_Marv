//npm install express request openai 터미널에 입력 필요!

import config from "apikeys.js"

var express = require('express');
var app = express();
var request = require('request');
const cors = require('cors');
app.use(cors());
app.use(express.static('public'))
var { OpenAIApi, Configuration } = require('openai');

let config = new Configuration({
  apiKey: config.GPT_API_KEY,  //cgpt api key
});
let openai = new OpenAIApi(config);

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
})

var client_id = config.PAPAGO_API_KEY; //파파고 api key
var client_secret = 'iyvwDj8hIE';

app.get('/translate', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var query = req.query.q;
   
   var options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.post(options, function (error, response, body) {
       var question = JSON.parse(body).message?.result.translatedText;

       openai.createCompletion({
          model: "text-davinci-002",
          prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses: \n You: ${question}`,
          temperature: 0.5,
          max_tokens: 128,
          top_p: 0.3,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        }).then((result) => {
          console.log('ai 응답', result.data.choices[0].text);

          var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
          var query = result.data.choices[0].text.replace('Marv','').replace(':','');
          var options = {
              url: api_url,
              form: {'source':'en', 'target':'ko', 'text':query},
              headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
          };
          request.post(options, function (error, response, body) {
            console.log(body);
            res.status(200).json(body);
              
          });


        }).catch((error)=>{
          console.log('openai error', error)
        })

   });
 });


 app.listen('https://port-0-marvserver-7xwyjq992llj8d1295.sel4.cloudtype.app/', function () {
   console.log('http://localhost:3000/ app listening on port 3000!');
 });