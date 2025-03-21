
import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Trackify ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of the Trackify website and application (the "Service").
          </p>
          <p className="mb-4">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Content</h2>
          <p className="mb-4">
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the data you input into the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Limitation Of Liability</h2>
          <p className="mb-4">
            In no event shall Trackify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
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

export default Terms;
