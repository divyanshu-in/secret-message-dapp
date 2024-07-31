# Secret Message Dapp - 

## Installation - 

Install docker and docker-compose on your system

linux - 
```
apt install docker docker-compose
```

## Setup-

after installation, setup local environment - 

setup a wallet, and retrieve its private key,and create a `.env` file in the root directory
this are the env variables required - 

##### PRIVATE_KEY
Private key of your wallet 

##### MESSAGE
Message to be used for initialization of contract

##### PASSWORD
Password for message retrieval

##### ARBITRUM_SEPOLIA_RPC
Url of the arbitrum sepolia rpc


##### CONTRACT_ADDRESS
Address of the contract that we will deploy later on, you can leave it for now.

## Deploy Contract - 

simply run the following command in the root directory in order to deploy the contract

```
docker compose up deploy
```

this will deploy a new contract and you can get the deployed contract address in `deployments` file.

**NOTE: before moving forward make sure you copy the deployed contract address and update your `.env`**

## Run Backend Server - 

This is the last step, Run the following command to get the server up and running -

```
docker compose up
```

## API Documentation
you can test out the api by either using the `curl` or you can post these directly into the `postman`, `insomnia` or any other tool of your choice.

### GET: api/message
get message from the deployed contract - 
```
curl -X GET http://localhost:3000/api/message
```

sample-output - 
```json
{"message": "Hello, World!"}
```

### POST: api/message
update message on deployed contract - 
```
curl -X POST http://localhost:3000/api/message \
-H "Content-Type: application/json" \
-d '{"message": "REPLACE_WITH_YOUR_MESSAGE"}'
```
sample-output - 
```json
{"transactionHash":"0xcd39174bd0f6f38d357ccec31db2955ec88f761d113185442ae27e192a23620b"}
```