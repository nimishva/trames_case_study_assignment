const express           = require('express'); //Including Express
const router            = express.Router();
const appConfig         = require('../../config/appConfig'); //Including appConfig file
const authController    = require('../controllers/authCon'); //Including Controller file

let setRouter = (app) =>{

   let baseUrl = `${appConfig.apiVersion}/auth`; //Declaring baseUrl 


    //Routes 
    //OTP Generation route
    app.post(`${baseUrl}/OtpGeneration`,authController.OTPGenAndMail);

    /**
	 * @api {post} /api/v1/auth/OtpGeneration  Generating OTP
	 * @apiVersion 0.0.1
	 * @apiGroup POST
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "OTP has been sent to the mail id",
	    "status": 200,
	    "data": null
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Data Fetching error.",
	    "status": 500,
	    "data": null
	   }
	 */



      //Validate OTP route
    app.post(`${baseUrl}/validateOtp`,authController.validateOTP);

    /**
	 * @api {post} /api/v1/auth/validateOtp Validate OTP
	 * @apiVersion 0.0.1
	 * @apiGroup POST
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "OTP Validated",
	    "status": 200,
	    "data": null
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "OTP Not Valid",
	    "status": 500,
	    "data": null
	   }
	 */


};


module.exports = {
    setRouter : setRouter
}