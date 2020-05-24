let appConfig = {};

appConfig.port              = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env               = "dev";
appConfig.db                = {  uri : 'mongodb+srv://tramesapi:z5RGZUIqcSQbVjJR@cluster0-lu6h4.mongodb.net/test?retryWrites=true&w=majority'};
appConfig.apiVersion        = '/api/v1';


module.exports = {

    port                : appConfig.port,
    db                  : appConfig.db,
    allowedCorsOrigin   : appConfig.allowedCorsOrigin,
    env                 : appConfig.env,
    apiVersion          : appConfig.apiVersion
}

