const mongoose       = require('mongoose');//Including Express
const apiResponse    = require('../libs/responseGenLib'); // Response generation library
const checkLib       = require('../libs/checkLib'); // Data validation library
const shortId        = require('shortid'); //unique id generator
const passwordLib    = require('../libs/passwordLib') // Password handling library . hashpassword ,compare password etc.
const tokenLib       = require('../libs/tokenLib'); //Token Library
const timeLib        = require('../libs/timeLib'); //Date and time handling library
const otpLib         = require('../libs/otpLib');// Otp Library  
const mailLib        = require('../libs/mailLib'); //Mail Library 

const authModel = mongoose.model('Auth'); //Importing Models

let OTPGenAndMail = (req,res)=>{

let checkEmail = ()=>{

        return new Promise((resolve,reject)=>{
            authModel.findOne({email:req.body.email})
            .exec((err,retrievedData)=>{
                if(err){
                    let response = apiResponse.generate(true,'Data Fetching error.',403,null);
                    reject(response)
                }else if(checkLib.isEmpty(retrievedData)){
                    let newAuthData = new authModel({
                        id          : shortId.generate(),
                        email       : req.body.email,
                        secretKey   : otpLib.generateSecret(), 
                    })

                    newAuthData.save((err,data)=>{
                        if(err){
                            let response = apiResponse.generate(true,'Database updation error.',403,null);
                            reject(response)
                        }else{

                            resolve(data);
                           

                        }
                    }) //Saving data to DB

                } //Checking for empty data
                else{
                    resolve(retrievedData);
                } //If not empty fetching data from db and generating OTP.
            })
        })


}  // Check Mail

let sendOTPMail = (data)=>{
    return new Promise((resolve,reject)=>{
        let otp = otpLib.generateOtp(data.secretKey);
        setTimeout(() => {
            mailLib.sendMail(data.email,otp)
            .then(data=>{
                     if(data[0].statusCode === 202){
                         resolve("Mail sent");
                     }
                   });//Sending OTP mail
        }, 1000);
     
    })
} //sendOTPMail ends here

checkEmail(req,res)
.then(sendOTPMail)
.then(resolve=>{
    let response = apiResponse.generate(false,'OTP has been sent to the mail id',403,null);
    res.send(response);
})
.catch(err => {
    console.log(err);
    res.send(err);
})

} //OtpGeneration and Mail fn ends 



let validateOTP = (req,res)=>{
    authModel.findOne({email:req.body.email})
    .exec((err,retrievedData)=>{
        if(err){
            let response = apiResponse.generate(true,'Fetching error.',403,null);
            reject(response)
        }else if(checkLib.isEmpty(retrievedData)){
            let response = apiResponse.generate(true,'Fetching error.',403,null);
            reject(response)
        } //Checking for empty data
        else{

            console.log(retrievedData);
            let valid = otpLib.verifyOtp(req.body.otp,retrievedData.secretKey);
            console.log(valid);
            if(valid){

                let response = apiResponse.generate(false,'OTP Validated.',200,null);
                res.send(response)

            }else{
                let response = apiResponse.generate(true,'OTP Not Valid.',503,null);
                res.send(response)
            }
        } //If not empty fetching data from db and generating OTP.
    })
}



module.exports = {
    OTPGenAndMail : OTPGenAndMail,
    validateOTP : validateOTP
}