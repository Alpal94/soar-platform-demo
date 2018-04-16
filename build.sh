#!/bin/bash

cd smart-contracts

echo "****  Compiling smart contracts"
truffle compile

echo "**** Migrating"
truffle migrate
cd ../react-app

echo "**** Copying contracts to react app"
cp -R ../smart-contracts/build/contracts/ ./src/lib/contracts/

echo "**** Installing"
yarn install

echo "**** Starting"
yarn start