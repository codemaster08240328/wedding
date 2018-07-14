import axios from 'axios';
import * as API from './constant'; 

export function generateWeddingPhotographyWorksheet(data, cb){
    data.append(API.KEY, API.API_KEY);
    data.append(API.ACTION, API.API_GENERATEWEDDINGPHOTOGRAPHYWORKSHEET);
    data.append(API.JSON, true);
    console.log('data',data);
    const config = {
        url: '/',
        method: 'post',
        data
    };
    axios.request(config)
        .then(res => res.data)
        .then(result => {        
            cb(result);
        });
}

export function generateEngagementPhotographyWorksheet(data, cb){
    data.append(API.KEY, API.API_KEY);
    data.append(API.ACTION, API.API_GENERATEENGAGEMENTPHOTOGRAPHYWORKSHEET)
    data.append(API.JSON, true)
    console.log('data', data);
    const config = {
        url:'/',
        method:'post',
        data
    }
    axios.request(config)
        .then(res=>res.data)
        .then(result=>{
            cb(result)
        });
}

export function generateWeddingVideographyWorksheet(data, cb){
    data.append(API.KEY, API.API_KEY);
    data.append(API.ACTION, API.API_GENERATEWEDDINGVIDEOGRAPHYWORKSHEET)
    data.append(API.JSON, true)
    console.log('data', data);
    const config = {
        url:'/',
        method:'post',
        data
    }
    axios.request(config)
        .then(res=>res.data)
        .then(result=>{
            cb(result)
        });
}