const express = require('express');
const dotenv = require('dotenv').config({ path: '.env.development.local' });
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const axios = require('axios').default;
const wsseTEst = require('./middleware/wsse-test');
const Users = require('./models/Users');
const Incident = require('./models/ITIncidents');
const Problems = require('./models/ITProblems');
const UIModules = require('./models/UIModules');
const Admin = require('./models/Admin');
const AssignmentGroups = require('./models/AssignmentGroups');
const DBUtil = require('./models/DBUtils');

const app = express(); // create express app
const port = process.env.PORT || 5000;
app.use(helmet());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '.../build')));
}

app.get('/api/sessions', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await DBUtil.getSessions();
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/api/slowqueries', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await DBUtil.getSlowSQLQueries();
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/api/assignment_groups', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await AssignmentGroups.getAssignmentGroups(req.query);
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/api/admin/dictionary', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await Admin.getDictionary();
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/api/it_problems', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const problems = await Problems.getITProblems(req.query);
    res.send(problems);
  } catch (error) {
    res.status(500).send(); 
  }
});

app.get('/api/table/:tablename', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  const { tablename } = req.params;

  try {
    // Dynamically find the corresponding model method
    const modelMethod = getModelMethod(tablename);

    // Call the model method with the request query parameters
    const data = await modelMethod(req.query);

    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});


// Helper function to get the corresponding model method based on the tablename
function getModelMethod(tablename) {
  
  // Map of the tablename to the corresponding model method
  const modelMethods = {
    it_incidents: Incident.getIncidents,
    it_problems: Problems.getITProblems,
  };

  // Get the corresponding model method based on the tablename
  const modelMethod = modelMethods[tablename];

  if (!modelMethod) {
    throw new Error('Invalid tablename');
  }

  return modelMethod;
}

app.get('/api/users', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const user = await Users.getUsers();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid; // Extract the UID from the URL parameters
  
  try {
    const user = await Users.getUser(uid); // Call the getUser method with the UID asynchronously
    res.send(user); // Send the user data as the response
  } catch (error) {
    res.status(500).send(); // Handle any errors and send a 500 server error response
  }
});
app.get('/api/ui_modules', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const user = await UIModules.getUIModules();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await Users.createUser(req);
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/api/casefiles', async (req, res) => {
  try {
    const token2 = wsseTEst.wsseHeader(
      process.env.PENNEO_KEY,
      process.env.PENNEO_SECRET
    );

    await axios
      .get('https://sandbox.penneo.com/api/v3/casefiles', {
        headers: {
          Accept: 'application/json',
          'X-WSSE': token2,
          Authorization: 'WSSE profile="UsernameToken"',
        },
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

// start express server on port 5000
app.listen(port, () => {
  console.log('server started on port' + port);
  // console.log(dotenv);
});