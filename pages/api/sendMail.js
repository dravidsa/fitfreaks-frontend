import React from 'react'
import ReactDOMServer from 'react-dom/server'

import RegistrationTemplate from "./templates/registrationTemplate" ; 

export default async function sendMail(req,res) {
    const EMAIL_USER =  process.env.EMAIL_USER ; 
    const EMAIL_PASS =  process.env.EMAIL_PASS ; 
    const SMTP_HOST  =  process.env.SMTP_HOST ; 
    const SMTP_PORT  =  process.env.SMTP_PORT ; 

    console.log  ( "in send api" + EMAIL_USER , EMAIL_PASS, SMTP_HOST , SMTP_PORT) ; 

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
    const template = data.template ; 
    const query = data.query ; 

    var from = ""  ; 
    var to = "" ; 
    var HTMLBody = "" ; 

    console.log( "sending a mail to " + email + "for event "+ event_name  +  "'for cat " +  event_catagory + subject  + "for customer" +customer_name ) ; 

    if ( template == "registration") {  

        HTMLBody = ReactDOMServer.renderToStaticMarkup( 
        <RegistrationTemplate
        name={customer_name}
        event_catagory={event_catagory}
        enrollmentID={enrollmentID}
        event_name={event_name}
    />
    );

    
    from = EMAIL_USER ; 
    to = email  ; 
    }
    

    if ( template=="query") { 

        message_body = data.query ; 
        from = email ; 
        to = EMAIL_USER ; 
    }
        var nodemailer = require('nodemailer');
      
        // create reusable transporter object using the gmail transport
        var transporter = nodemailer.createTransport({
            host: SMTP_HOST ,
            secure: true,
            port: SMTP_PORT,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });
        
        var mailOptions = {
            from: from,                   // sender's gmail
            to: to ,                  // receiver's gmail
            subject: subject,     //subject
            html: HTMLBody   ,
            headers: {
                'Content-Type': 'text/html'
            }                     
        };
        console.log("mailoptions are " , JSON.stringify(mailOptions)) ; 

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



      


  
