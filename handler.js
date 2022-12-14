'use strict';
const S3 = require('aws-sdk/clients/s3');
const BUCKET_NAME = process.env.BUCKET_NAME
const s3 = new S3();
module.exports.generatePresignedUrl = async (event) => {
  try{
      let body = JSON.parse(event.body);
      let objectKey = body.objectKey
      let s3Action = body.s3Action
      let contentType = body.contentType

      let expirationTime = 60

      let params = {
        Bucket : BUCKET_NAME,
        Key : objectKey,
        Expires : expirationTime
      }

      if(s3Action == 'putObject') {
        params.ContentType = contentType,
        params.Expires = 300
      }

      const signedUrl = s3.getSignedUrl(s3Action, params)

      return {
        statusCode : 200,
        body : JSON.stringify(signedUrl)
      }

  } 
  catch (error) {
    console.log("Error ...", error);
    return {
      statusCode : 500,
      body : 'Please check logs'
    }
  }
};
