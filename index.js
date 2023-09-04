
// const express = require("express");
// require("dotenv").config();

// const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
// const base = "https://api-m.sandbox.paypal.com";
// const app = express();

// // host static files
// app.use(express.static("client"));

// // parse post params sent in body in json format
// app.use(express.json());

// /**
//  * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
//  * @see https://developer.paypal.com/api/rest/authentication/
//  */
// const generateAccessToken = async () => {
//   try {
//     if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
//       throw new Error("MISSING_API_CREDENTIALS");
//     }
//     const auth = Buffer.from(
//       PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
//     ).toString("base64");
//     const response = await fetch(`${base}/v1/oauth2/token`, {
//       method: "POST",
//       body: "grant_type=client_credentials",
//       headers: {
//         Authorization: `Basic ${auth}`,
//       },
//     });

//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.error("Failed to generate Access Token:", error);
//   }
// };

// /**
//  * Create an order to start the transaction.
//  * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
//  */
// const createOrder = async (cart) => {
//   // use the cart information passed from the front-end to calculate the purchase unit details
//   console.log(
//     "shopping cart information passed from the frontend createOrder() callback:",
//     cart,
//   );

//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders`;
//   const payload = {
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: "100.00",
//         },
//       },
//     ],
//   };

//   const response = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
//       // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//       // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   return handleResponse(response);
// };

// /**
//  * Capture payment for the created order to complete the transaction.
//  * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
//  */
// const captureOrder = async (orderID) => {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders/${orderID}/capture`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
//       // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//     },
//   });

//   return handleResponse(response);
// };

// async function handleResponse(response) {
//   try {
//     const jsonResponse = await response.json();
//     return {
//       jsonResponse,
//       httpStatusCode: response.status,
//     };
//   } catch (err) {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }

// app.post("/api/orders", async (req, res) => {
//   try {
//     // use the cart information passed from the front-end to calculate the order amount detals
//     const { cart } = req.body;
//     const { jsonResponse, httpStatusCode } = await createOrder(cart);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to create order." });
//   }
// });

// app.post("/api/orders/:orderID/capture", async (req, res) => {
//   try {
//     const { orderID } = req.params;
//     const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to capture order." });
//   }
// });

// // serve index.html
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve("./client/checkout.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Node server listening at http://localhost:${PORT}/`);
// });



// require("dotenv").config();
// const cors = require("cors");
// const { default: axios } = require("axios");

// app.listen(5000, () => {
//   console.log("server run nicely");
// });
// // app.use(cors);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors())
// const TokenRoute= require("./routes/token") 
// app.use("/token", TokenRoute)




// app.get("/", (req, res) => {
//   res.send("Mpesa backend");
// });





const express = require("express");

const app = express();
require("dotenv").config();
const cors = require("cors");
const { default: axios } = require("axios");

app.listen(5000, () => {
  console.log("server run nicely");
});
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://grind-lean-fit-beige.vercel.app", // Replace with your frontend URL
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

const TokenRoute= require("./routes/token") 
app.use("/token", TokenRoute)




app.get("/", (req, res) => {
  res.send("Mpesa backend");
});

// const express = require("express");
// const cors = require("cors"); // Import the cors package

// const app = express();
// require("dotenv").config();

// // Add CORS middleware to allow requests from any origin
// app.use(
//   cors()
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const TokenRoute = require("./routes/token");
// app.use("/token", TokenRoute);

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
