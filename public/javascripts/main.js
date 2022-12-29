function runServer(params,apikey,articleText){
  const APIKEY = apikey;
  const ENDPOINT = 'https://api.openai.com/v1/completions';

  const params2 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: {
      model: 'text-davinci-003',
      //  prompt: stringPrompt !== ""?stringPrompt+" starting with the headline: ":"Write a 500 word news article from this text: "+data.text,
      prompt: articleText,
      max_tokens: 812,
      stream: true,
    },
    responseType: 'stream'
  };

  console.log(params2);

  console.log("params2 End");

//  var params1 = JSON.parse(params);
//  params1.prompt = articleText;
 // console.log(params1);

  console.log("Params End");

 // console.log(params1.body);
  console.log("Params Body");

  var filecontent = "";

}


async function onSendRequestToo() {
  const APIKEY = '';
  const ENDPOINT = 'https://api.openai.com/v1/completions';

  var prompt_str = document.getElementById('prompt_str').value;
  var prompt1 = 'Write a title for this text: ' + prompt_str;
  var prompt2 = 'What is missing from this text: ' + prompt_str;
  var prompt3 = 'Write a summary of this text: ' + prompt_str;

  document.getElementById('loader-wrapper').style.display = 'block';
  const params1 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: {
      model: 'text-davinci-003',
      prompt: prompt1,
      max_tokens: 256,
    },
  };

  const params2 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: {
      model: 'text-davinci-002',
      prompt: prompt2,
      max_tokens: 256,
    },
  };

  const params3 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: {
      model: 'text-davinci-003',
      prompt: prompt3,
      max_tokens: 256,
    },
  };

  await axios
      .post(ENDPOINT, params1.body, { headers: params1.headers })
      .then((response) => response.data)
      .then((data) => {
        document.getElementById('result1').innerText = data.choices[0].text;
        console.log(data.choices[0].text);
      });

  await axios
      .post(ENDPOINT, params2.body, { headers: params2.headers })
      .then((response) => response.data)
      .then((data) => {
        document.getElementById('result2').innerText = data.choices[0].text;
        console.log(data.choices[0].text);
      });

  await axios
      .post(ENDPOINT, params3.body, { headers: params3.headers })
      .then((response) => response.data)
      .then((data) => {
        document.getElementById('result3').innerText = data.choices[0].text;
        console.log(data.choices[0].text);
      });

  document.getElementById('loader-wrapper').style.display = 'none';
}

async function onSendRequest(stringToSend) {
  const APIKEY = process.env.API_KEY;
  const ENDPOINT = 'https://api.openai.com/v1/completions';

  var prompt_str = document.getElementById('prompt_str').value;
  var prompt1 = 'Write a title for this text: ' + prompt_str;
  var prompt2 = 'What is missing from this text: ' + prompt_str;
  var prompt3 = 'Write a summary of this text: ' + prompt_str;

  document.getElementById('loader-wrapper').style.display = 'block';
  const params1 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt1,
      max_tokens: 256,
    }),
  };

  const params2 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt2,
      max_tokens: 256,
    }),
  };

  const params3 = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt3,
      max_tokens: 256,
    }),
  };

  await fetch(ENDPOINT, params1)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result1').innerText = data.choices[0].text;
      console.log(data.choices[0].text);
    });

  await fetch(ENDPOINT, params2)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result2').innerText = data.choices[0].text;
      console.log(data.choices[0].text);
    });

  await fetch(ENDPOINT, params3)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result3').innerText = data.choices[0].text;
      console.log(data.choices[0].text);
    });

  document.getElementById('loader-wrapper').style.display = 'none';
}
