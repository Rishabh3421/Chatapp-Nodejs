const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios library

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Hello, this is the root page!");
});

// Define routes
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, firstname: username },
      { headers: { "private-key": "d2fe33a4-5c19-4e3c-a10c-597874b42baa" } }
    );

    // Handle the response from the external API properly
    return res.status(response.status).json(response.data);
  } catch (error) {
    // Log the error for better debugging
    console.log("Error in API call:", error.response.data);

    // Send an appropriate response with more detailed error information
    return res.status(500).json({ error: "Error in API call", details: error.response.data });
  }
});

// Start the server
app.listen(9000, () => {
  console.log('Server is running on port 9000');
});
