# **Risk Score API**

## **Running the API:**

**Requirements:**

- Docker CLI

**Step 1 - Build the docker image:**

Run the following command on the root of the project to build the docker image

```console
$ docker build . -t risk-score-api
```

**Step 2 - Start the docker container:**

Replace **PORT** with the port you want the API to listen to and run the following command to start the docker container with the application

```console
$ docker run -p PORT:8080 -d risk-score-api
```

## **Available endpoints:**

### **`POST` /api/risk** - Calculate the risk profile for a client based on his/hers information

- **Expected payload**:

  ```json
  {
    "age": 35,
    "dependents": 2,
    "house": { "ownership_status": "owned" },
    "income": 0,
    "marital_status": "married",
    "risk_questions": [0, 1, 0],
    "vehicle": { "year": 2018 }
  }
  ```

  details on the payload structure can be found on [this repo](https://github.com/OriginFinancial/origin-backend-take-home-assignment)

- **Expected response**:

  ```json
  {
    "auto": "regular",
    "disability": "ineligible",
    "home": "economic",
    "life": "regular"
  }
  ```

  details on the response structure can be found on [this repo](https://github.com/OriginFinancial/origin-backend-take-home-assignment)

## **Running the API for local testing and development:**

**Requirements:**

- Node.js 14 (or higher)
- Yarn

**Step 1 - Install the dependencies and build the project:**

Run yarn on the root of the project to download the dependencies and build the project

```console
$ yarn
```

**Step 2 - Start the API:**

Run the **start:dev** script to start the API, watch for changes(and restart the API when they happen) and expose a port to debug the code. It's possible to debug the code on VSCode with the [provided launch.json file](.vscode/launch.json)

```console
$ yarn start:dev
```

**Tests:**

All the tests can be listed by running

```console
$ yarn test:list
```

To watch for changes and run the related tests the following script can be used

```console
$ yarn test
```

## **Adding new Risk Rules to the algorithm:**

The risk algorithm is based on a collection of rules that can be found on the [rules folder](src/rules). All the rules listed on the [rulesList](src/rules/index.ts) will be applied to the client's information to provide a final RiskScore, that in the end is converted into the client's RiskProfile.

To add a new rule to the algorithm all you need to do is to export a new function([following the RiskRule interface](src/model.ts)) from a new file under the rules folder with the rule name, import the rule into the [index.ts](src/rules/index.ts) and add it to the rulesList.

## **Technical decisions made:**

### **Choosing Node.js and express over anything else:**

My choice was basically out of affinity, I had done lots of work previously with Node.js APIs and was confident that I could structure a good new API from scratch in sufficient time.

### **Choosing Typescript over Javascript:**

Type consistency gives me more confidence on my code and helps a lot during development because of the autocompletion that is enabled by having it.

### **Choosing Docker for building and running the API:**

Docker gives me confidence that the code will be built and run succesfully anywhere else it needs to (as long as Docker is available).
