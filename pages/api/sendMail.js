import React from 'react'
import ReactDOMServer from 'react-dom/server'

import RegistrationTemplate from "./templates/registrationTemplate" ; 
import QueryTemplate  from './templates/queryTemplate';

export default async function sendMail(req,res) {
    const EMAIL_USER =  process.env.EMAIL_USER ; 
    const EMAIL_PASS =  process.env.EMAIL_PASS ; 
    const SMTP_HOST  =  process.env.SMTP_HOST ; 
    const SMTP_PORT  =  process.env.SMTP_PORT ; 

    console.log("in send api", EMAIL_USER, EMAIL_PASS, SMTP_HOST, SMTP_PORT);

    let data;
    try {
        // If content-type is application/json, req.body is already parsed
        // If content-type is application/text, we need to parse it
        data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        console.log("Request data:", data);
    } catch (error) {
        console.error("Error parsing request data:", error);
        return res.status(400).json({ error: 'Invalid request data' });
    }
/*
 name: name,
      customer_email: customer_email,
      subject: subject,
      template: template,
      query: message,
      to_email: to_email
*/

    const email = data?.email;
    const event_name = data?.event_name;
    const event_catagory = data?.event_catagory;
    const subject = data?.subject;
    const enrollmentID = data?.enrollmentID;
    const name = data?.name;  // Using name instead of customer_name for query template
    const customer_name = data?.customer_name || data?.name;  // Fallback for registration template
    const template = data?.template;
    const query = data?.query;
    const to_email = data?.to_email;
    const customer_email = data?.customer_email; 

    var from = ""  ; 
    var to = "" ; 
    var HTMLBody = "" ; 

   

    if ( template == "registration") {  
        console.log("sending a mail to " + email + " for event "+ event_name  +  "'for cat " +  event_catagory + subject  + "for customer" +customer_name ) ; 
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
    }''
    

    if ( template=="query") { 
        console.log("got this ", customer_email) ;
        console.log("sending a mail to " + customer_email + " for  "+ subject  + "for customer" +customer_name ) ; 
        HTMLBody = ReactDOMServer.renderToStaticMarkup( 
            <QueryTemplate
            name={name}
            subject={subject}
            from={customer_email}
            query={query}
            />
        );
        
        //message_body = data?.query ; 
        from = EMAIL_USER ; 
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
            customer_email : customer_email, 
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



      


  
