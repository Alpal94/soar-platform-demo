# Soar Platform - react app

This is create-app-project using ethereum blockchain

## Technical stack

#### Frontend
- React
- Redux
- Saga
- Web3(MetaMask)

#### UI
- Sass
- Bootrapt

## Prerequisites
In order to run the Soar platform, you will need [Node.js](https://nodejs.org) (tested with version 8.x.x). This will include npm, needed to install dependencies. You will also need the [MetaMask](https://metamask.io/) plugin for Chrome or Firefox.

## Installation and Building

1. Install yarn.

    ```javascript
    ## MacOS
    brew install yarn

    ## Windows
    https://yarnpkg.com/en/docs/install#windows-tab
    ```

2. Download or clone repository.

3. Install the node dependencies.
    ```javascript
    yarn install
    ```

4. Copy the produced json files from smart-contracts project in the src/lib/contracts
    
    ```javascript
    ## Windows powershell
    Copy-Item ..\smart-contracts\build\contracts .\src\lib -force -recurse

    ## MacOS
    cp -r ../smart-contracts/build/contracts ./src/lib
    ```

5. Run the webpack server for front-end hot reloading. For now, smart contract changes must be manually recompiled and migrated.
    ```javascript
    yarn start
    ```

6. Jest is included for testing React components
    ```javascript
    // Runs Jest for component tests.
    yarn test
    ```

7. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    yarn build

