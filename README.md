# Soar Platform

This is starting project for Soar Platform based on Ens-Bid Truffle Box (https://github.com/ens-bid/ens-bid-truffle-box) using ethereum blockchain. 

## Technical stack

#### Frontend
- React
- Redux
- Saga
- Web3(MetaMask)

#### UI
- Sass
- Material-UI

#### Smart contract/Solidity
- Truffle

## Prerequisites
In order to run the Soar platform, you will need [Node.js](https://nodejs.org) (tested with version 8.x.x). This will include npm, needed to install dependencies. You will also need the [MetaMask](https://metamask.io/) plugin for Chrome or Firefox.

## Installation and Building

1. Install truffle and an ethereum client. For local development, try Ganache CLI.
    ```javascript
    npm install -g truffle
    npm install -g ganache-cli
    ```

2. Install yarn.

    ```javascript
    ## MacOS
    brew install yarn

    ## Windows
    https://yarnpkg.com/en/docs/install#windows-tab
    ```

3. Download or clone repository.

4. Install the node dependencies.
    ```javascript
    yarn install
    ```

5. Run Ganache CLI.
    ```javascript
    ganache-cli
    ```

6. Compile and migrate the contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```
7. Copy the produced json files in the src/lib/contracts
    
    ```javascript
    ## Windows powershell
    Copy-Item .\build\contracts .\src\lib -force -recurse

    ## MacOS
    cp -r ./build/contracts ./src/lib/contracts
    ```

8. Run the webpack server for front-end hot reloading. For now, smart contract changes must be manually recompiled and migrated.
    ```javascript
    yarn start
    ```

9. Jest is included for testing React components and Truffle's own suite is included for smart contracts. Be sure you've compile your contracts before running jest, or you'll receive some file not found errors.
    ```javascript
    // Runs Jest for component tests.
    yarn test

    // Runs Truffle's test suite for smart contract tests.
    truffle test
    ```

10. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    yarn build

