const express           = require('express'); //Including Express
const router            = express.Router();
const appConfig         = require('../../config/appConfig'); //Including appConfig file
const userController    = require('../controllers/usersCon'); //Including Controller file

let setRouter = (app) =>{

   let baseUrl = `${appConfig.apiVersion}/users`; //Declaring baseUrl 


    //Routes 
    //Signup route
    app.post(`${baseUrl}/signUp`,userController.signUpFn);

    /**
	 * @api {post} /api/v1/users/signup New User Signup
	 * @apiVersion 0.0.1
	 * @apiGroup POST
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Created",
	    "status": 200,
	    "data": [
                              {
						            userId: "string",
					            	username: "string",
						            firstName: "string",
						            lastName: "string",
						            email: string,
						            mobile: number,
						            createdOn: "date"
					             }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "user creation error",
	    "status": 500,
	    "data": null
	   }
	 */



    //Signin  route
    app.post(`${baseUrl}/signInWithToken`,userController.signInWithToken);
    /**
	 * @api {post} /api/v1/users/signInWithToken Sign In With Token
	 * @apiVersion 0.0.1
	 * @apiGroup POST
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Login successfull",
	    "status": 200,
        "data": [ 
                    userData :   
                                {
						            userId: "string",
					            	username: "string",
						            firstName: "string",
						            lastName: "string",
						            email: string,
						            mobile: number,
						            createdOn: "date"
					             }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "User details not found",
	    "status": 500,
	    "data": null
	   }


	   	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Token Validation Error",
	    "status": 500,
	    "data": null
	   }

	 */

};


module.exports = {
    setRouter : setRouter
}