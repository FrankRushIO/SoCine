// const { MOVIE_API_KEY } = require("dotenv");
// const request = require("request-promise");

// // Returns the current position of the ISS
// const getIssPosition = () => {
//   console.log(MOVIE_API_KEY);
//   return request("http://api.open-notify.org/iss-now.json")
//     .then((response) => JSON.parse(response))
//     .then((parsedResponse) => {
//       console.log(parsedResponse);

//       const issPosition = {
//         message: parsedResponse.message,
//         iss_position: newKeys,
//         timestamp: parsedResponse.timestamp,
//       };
//       return issPosition;
//     })
//     .catch((err) => {
//       return console.log("error");
//     });
// };

// getIssPosition().then((result) => console.log(result));
