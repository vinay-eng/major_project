# Major Project

This is an desktop application for dynamic shaker

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install Node.js
```
  Refer - https://nodejs.org/en/
 ```

### Installation

Clone this project or download zip
```
Open terminal in project directory
```
```
Run command 
$ npm i electron electron-packager asar electron-installer-debian electron-rebuild --save-dev
$ npm i dotenv serialport --save
    
```

```
Run command each time you install a new package
$ npm install
```

## Running the tests

```
Before running test change your USB port in config.env
example:- USB_PORT='/dev/ttyUSB0'
```

## Deployment

 ```
 For Linux: Run command
 $ npm run build    // It will create file dist
 $ npm run deb64    // It will create installer in dist/installers
 ```
 
 ```
 For mac and windows 
 Refer https://www.christianengvall.se/electron-packager-tutorial/
 ```
## Holder Design 

  ```
  Desing are made in CorelDraw 
  ```

