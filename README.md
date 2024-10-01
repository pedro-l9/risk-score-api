# **Risk Score API**

Company X offers its users an insurance package personalized to their specific needs, without requiring the user to understand anything about insurance, this allows them to act as their de-facto insurance advisor.

Company X determines the user’s insurance needs by asking personal & risk-related questions and gathering information about the user’s vehicle and house. Using this data, Company X determines their risk profile for each line of insurance and then suggests an insurance plan ("economic", "regular", "responsible") corresponding to their risk profile.

This API receives a JSON payload with the user's information and returns their risk profile

## The input

A JSON payload representing the user's **personal information**:

```JSON
{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}
```

### Payload attributes

**All attributes are required:**

- Age (an integer equal or greater than 0).
- The number of dependents (an integer equal or greater than 0).
- Income (an integer equal or greater than 0).
- Marital status (`"single"` or `"married"`).
- Risk answers (an array with 3 booleans).

### House

Users can have 0 or 1 house. When they do, it has just one attribute: `ownership_status`, which can be `"owned"` or `"mortgaged"`.

### Vehicle

Users can have 0 or 1 vehicle. When they do, it has just one attribute: a positive integer corresponding to the `year` it was manufactured.

## The risk algorithm

The application receives the JSON payload through the API endpoint and transforms it into a _risk profile_ by calculating a _risk score_ for each line of insurance (life, disability, home & auto) based on the information provided by the user.

First, it calculates the _base score_ by summing the answers from the risk questions, resulting in a number ranging from 0 to 3. Then, it applies the following rules to determine a _risk score_ for each line of insurance.

1. If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.
2. If the user is over 60 years old, she is ineligible for disability and life insurance.
3. If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is between 30 and 40 years old, deduct 1.
4. If her income is above $200k, deduct 1 risk point from all lines of insurance.
5. If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.
6. If the user has dependents, add 1 risk point to both the disability and life scores.
7. If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
8. If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.

This algorithm results in a final score for each line of insurance, which should be processed using the following ranges:

- **0 and below** maps to **“economic”**.
- **1 and 2** maps to **“regular”**.
- **3 and above** maps to **“responsible”**.

## The output

Considering the data provided above, the application should return the following JSON payload:

```JSON
{
    "auto": "regular",
    "disability": "ineligible",
    "home": "economic",
    "life": "regular"
}
```

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
    "vehicle": { "year": 2021 }
  }
  ```

  details on the payload structure can be found on [this repo](https://github.com/OriginFinancial/origin-backend-take-home-assignment/tree/8dd9db83851222a80da06ee023607a0af0b63465/tree/8dd9db83851222a80da06ee023607a0af0b63465)

- **Expected response**:

  ```json
  {
    "auto": "regular",
    "disability": "ineligible",
    "home": "economic",
    "life": "regular",
    "renters": "ineligible",
    "umbrella": "economic"
  }
  ```

  details on the response structure can be found on [this repo](https://github.com/OriginFinancial/origin-backend-take-home-assignment/tree/8dd9db83851222a80da06ee023607a0af0b63465)

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
