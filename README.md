# IFIDUK - The marketplace for web based apps

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

IFIDUK is an app suite for running your own SaaS marketplace. You assemble your app and deploy it on IFIDUK where your users can visit and deploy their own instances.

The suite consists of the following:
- A ReactJS front end that uses Azure Active Directory B2C for authentication and authorization - https://github.com/harishnarain/ifiduk-app
- An Azure Functions App that handles all CRUD operations and a MongoDB seeder. The functions app will also require Azure Service Bus for sending deployment messages - https://github.com/harishnarain/ifiduk-deployment-function
- The IFIDUK Server Agent that deploys containers on Docker - https://github.com/harishnarain/ifiduk-agent
- IFIDUK Terraform code to deploy services on Azure (Work in progress) - https://github.com/harishnarain/ifiduk-terraform

## Table of Contents

- [IFIDUK - The marketplace for web based apps](#ifiduk---the-marketplace-for-web-based-apps)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [License](#license)
  - [Contributing](#contributing)
  - [Screenshots](#screenshots)
  - [Questions](#questions)

## Installation

This is the installation instructions for the ReactJS front end app.

1. Clone this GitHub repository

   ```
   git@github.com:harishnarain/ifiduk-app.git
   ```

2. Install all dependent npm packages

   ```
   npm install --save
   ```

3. Run the development server

   ```
   npm start
   ```

4. If deploying to a hosting platform follow the instructions of that platform for deploying React apps

## Usage
## Deploy apps
1. Search for apps in the marketplace
2. Click deploy on the product card
3. Enter a tenant name and click deploy

## Admin
1. Sign in
2. Click on the Admin Console from the Navbar
3. Click Subscriptions to manage subscriptions

## Features

- Azure Active Directory B2C
- Material UI for ReactJS
- Axios for sending requests to Azure Functions deployment API
- Data rendered via APIs from MongoDB
- Data validation for tenant name
- Refresh button and search forms are debounced

## License

This project uses the MIT license

## Contributing

Pull requests are welcome

## Screenshots

**Home Page**

![Screenshot1](https://github.com/harishnarain/ifiduk-app/blob/main/Screenshot1.PNG?raw=true)
![Screenshot2](https://github.com/harishnarain/ifiduk-app/blob/main/Screenshot2.PNG?raw=true)
![Screenshot3](https://github.com/harishnarain/ifiduk-app/blob/main/Screenshot2.PNG?raw=true)

## Questions

Checkout my GitHub [profile](https://github.com/harishnarain)

Please feel free to email at: <Harish.Narain@microsoft.com>