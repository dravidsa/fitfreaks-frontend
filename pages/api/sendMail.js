import React from 'react'

export default async function sendMail(req,res) {
console.log  ( "in send api") ; 
/*
enrollmentID : enrollmentID , 
customer_name : customer_name , 
event_name : event_name ,
event_catagory : event_catagory , 
email : email  , 
subject : subject
*/ 

    const jsonString  = req.body;
    console.log ( "JSON is " + JSON.stringify(jsonString) ); 
    const data = JSON.parse(jsonString);
    console.log ( "data json is "+ JSON.stringify(data)) ; 
    const email = data.email;
    const event_name = data.event_name ; 
    const event_catagory = data.event_catagory ; 
    const subject = data.subject ; 
    const enrollmentID = data.enrollmentID ; 
    const customer_name = data.customer_name ; 

    
    console.log( "sending a mail to " + email + "for event "+ event_name  +  "'for cat " +  event_catagory + subject  + "for customer" +customer_name ) ; 

    var message_body = 'Dear ' + customer_name  + '\n' ; 
    message_body = message_body + 'Your registration for event - ' + event_name + 'is successful \n' ; 
    message_body = message_body + 'Enrollment ID : ' + enrollmentID  + '\n' ; 
    message_body = message_body + 'Event Catagory : ' + event_catagory + '\n' ;
    //console.log ( "Message is " + message_body );

        var nodemailer = require('nodemailer');
      
        // create reusable transporter object using the gmail transport
        var transporter = nodemailer.createTransport({
            host: "smtp.zoho.in" ,
            secure: true,
            port: 465,
            auth: {
                user: 'support@fitfreaks.in',
                pass: 'Cloud@6698'
            }
        });
        
        var mailOptions = {
            from: 'support@fitfreaks.in',                   // sender's gmail
            to: email  ,                  // receiver's gmail
            subject: subject,     //subject
            text: message_body                       //message Description
        };
        
        //send mail using transport object’s sendMail() function
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500) ; 
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200) ; 
            }
        });
        
    } ; 



      


  
