import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-0">
      {/* Page Title */}
      <div className="pt-8 text-2xl text-center border-t">
        <Title text1={"PRIVACY"} text2={"POLICY"} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center my-10">
        <div className="flex flex-col gap-6 text-gray-600 w-full max-w-3xl text-justify leading-relaxed">
          <p>
            At <b>Revora</b>, your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you visit our website and use our services. By
            using our website, you agree to the practices described in this
            policy.
          </p>

          <b className="text-gray-800">1. Information We Collect</b>
          <ul className="list-disc pl-6">
            <li>Account details such as your name and email address.</li>
            <li>
              Order information including billing, shipping, and payment data.
            </li>
            <li>
              Usage data, cookies, and analytics information to improve your
              shopping experience.
            </li>
          </ul>

          <b className="text-gray-800">2. How We Use Your Information</b>
          <ul className="list-disc pl-6">
            <li>To process your orders and provide customer support.</li>
            <li>To improve our website, products, and overall experience.</li>
            <li>To send important updates and promotional offers.</li>
          </ul>

          <b className="text-gray-800">3. Data Security</b>
          <p>
            Revora uses strong security practices to protect your data from
            unauthorized access, alteration, or disclosure. However, no online
            system is completely risk-free.
          </p>

          <b className="text-gray-800">4. Third-Party Services</b>
          <p>
            We may use trusted third-party providers for analytics, payments, or
            shipping. These partners only receive the information necessary to
            perform their specific services.
          </p>

          <b className="text-gray-800">5. Contact Us</b>
          <p>
            For questions or concerns about this Privacy Policy, reach us at:{" "}
            <br />
            <b>Email:</b> support@revora.com
          </p>
        </div>
      </div>

      {/* Feature Highlights (Optional) */}
      <div className="flex flex-col mb-20 text-sm md:flex-row md:justify-center md:gap-6">
        <div className="flex flex-col gap-5 px-10 py-8 border md:w-1/3">
          <h3 className="text-center font-semibold text-lg text-purple">
            Commitment to Privacy
          </h3>
          <p className="text-gray-600 text-justify">
            At Revora, we take privacy seriously. Your personal information is
            handled with care and used only for the purposes described in this
            policy.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 py-8 border md:w-1/3">
          <h3 className="text-center font-semibold text-lg text-purple">
            Safe Shopping
          </h3>
          <p className="text-gray-600 text-justify">
            We employ best practices to ensure a secure shopping experience.
            Your data and transactions are protected with up-to-date security
            measures.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 py-8 border md:w-1/3">
          <h3 className="text-center font-semibold text-lg text-purple">
            Support & Assistance
          </h3>
          <p className="text-gray-600 text-justify">
            Our support team is ready to help with any questions or concerns
            regarding your privacy, account, or shopping experience.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default PrivacyPolicy;
