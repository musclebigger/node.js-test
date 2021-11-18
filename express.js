const http = require('http');

// const app = require('express').Router();
let city = `Canberra`;
const url = `http://api.weatherapi.com/v1/current.json?key=a3b6ce10edfb46059ec55052211611&q=${city}&aqi=no`;
let weather = {
    data: [],

    temperature: http.get(url, res=>{
        res.on('data', (chunk)=>{this.data.push(chunk)});
        res.on('end', () => {this.data = Buffer.concat(this.data).toString();});
    })
};


   
console.log(weather.data);