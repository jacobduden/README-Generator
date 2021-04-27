// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const generate = require("./utilities/generateMarkdown");
// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    {
        type: "input",
        name: "badge",
        message: "please insert badge links that you want."
    },
    {
        type: "input",
        name: "description",
        message: "Please provide your project's description."
    },
    {
        type: "input",
        name: "installation",
        message: "Please provide installation instructions to use your project."
    },
    {
        type: "input",
        name: "usage",
        message: "Provide the project usuage."
    },
    {
        type: "input",
        name: "license",
        message: "Please provide the project licence."
    },
    {
        type: "input",
        name: "contributor",
        message: "Provide contributing parties to the project."
    },
    {
        type: "input",
        name: "test",
        message: "please provide the tests for the project."
    },
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
        type: "input",
        name: "repo",
        message: "Please provide your Github repository link."
    }
];
 
inquirer
.prompt(questions)
.then(function(data){
    const queryUrl = `https://api.github.com/users/${data.username}`;

    axios.get(queryUrl).then(function(res){

        const githubInformation = {
            githubImage: res.data.avatar_url,
            email: res.data.email,
            profile: res.data.html_url,
            name: res.data.name
        };
        fs.writeFile("README.md", generate(data, githubInformation), function(err){
            if (err) {
                throw err;
            };
            console.log("New README.md file was created successfully!");
        })
    })
})
