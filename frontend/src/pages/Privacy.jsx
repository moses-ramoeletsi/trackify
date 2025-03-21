
import React from "react";
import { Link } from "react-router-dom";
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p className="mb-4">
            Trackify ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, or make purchases through the Service.
          </p>
          <p className="mb-4">
            This information may include your name, email address, profile picture, payment information, and any other information you choose to provide.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Security</h2>
          <p className="mb-4">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Data Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information, such as the right to request access, correction, or deletion of your data.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at privacy@trackify.com.
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button className="btn-primary">
            <Link to="/">Return to Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
