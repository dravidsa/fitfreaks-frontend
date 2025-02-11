import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../../components/global/layout";
//import InnerPageLayout from "../../components/inner-page-layout";

const PrivacyPolicy = () => {
  
      
  return (
    <Layout title="Event Page">
    <div style={{ paddingLeft: "50px" }}>
      <center> <h2>Privacy Policy</h2></center>
      <p><strong>Effective Date:</strong> 1st July 2024</p>
      <p>Welcome to <strong>FitFreaks.in</strong>! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://fitfreaks.in">https://fitfreaks.in</a>. Please read this policy carefully to understand our views and practices regarding your personal data.</p>
      
      <h2>1. Information We Collect</h2>
      <h3>a) Personal Information</h3>
      <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Contact details</li>
          <li>Billing and payment information (for e-commerce purchases)</li>
      </ul>
      
      <h3>b) Non-Personal Information</h3>
      <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Website usage data (via cookies and analytics tools)</li>
      </ul>
      
      <h2>2. How We Use Your Information</h2>
      <ul>
          <li>To provide and improve our services</li>
          <li>To process transactions and fulfill orders</li>
          <li>To send newsletters, promotions, or marketing communications (with your consent)</li>
          <li>To monitor website usage and enhance user experience</li>
          <li>To comply with legal obligations</li>
      </ul>
      
      <h2>3. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar technologies to track user activity and improve our website. You can manage cookie preferences through your browser settings.</p>
      
      <h2>4. Sharing Your Information</h2>
      <p>We do not sell or rent your personal information. However, we may share your data with:</p>
      <ul>
          <li>Service providers assisting in website operations (e.g., hosting, payment processing)</li>
          <li>Legal authorities, if required by law</li>
          <li>Business partners for marketing purposes (with consent)</li>
      </ul>
      
      <h2>5. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal data. However, no online data transmission is completely secure, and we cannot guarantee absolute security.</p>
      
      <h2>6. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
          <li>Access, update, or delete your personal data</li>
          <li>Opt out of marketing communications</li>
          <li>Restrict or object to data processing</li>
          <li>Request data portability</li>
      </ul>
      <p>To exercise these rights, contact us at [Insert Contact Email].</p>
      
      <h2>7. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. We are not responsible for their privacy policies or practices.</p>
      
      <h2>8. Changes to This Policy</h2>
      <p>We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
      
      <h2>9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p><strong>FitFreaks.in</strong><br />
      support@fitfreaks.in<br />
      9922955408</p>
    </div>
  </Layout>
  );

};
export default PrivacyPolicy;