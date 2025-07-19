import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="pt-8 text-2xl text-center border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col gap-16 my-10 md:flex-row">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Photo"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p className="text-justify">
            Welcome to Revora, where quality and style come together. Our goal
            is to deliver the newest fashion trends and essential pieces,
            thoughtfully chosen for their design and quality. We believe fashion
            is a way to express yourself, and we’re here to make that journey
            effortless and fun. Our collections are curated to provide a variety
            of options that suit every style and occasion.
          </p>
          <p className="text-justify">
            At Revora, your satisfaction is our top priority. From browsing our
            site to receiving your order, we’re committed to making your
            shopping experience effortless and enjoyable. Our team constantly
            tracks the latest trends so you can access fresh styles right as
            they arrive. Thank you for choosing Revora—we’re thrilled to be part
            of your style journey.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p className="text-justify">
            At Revora, our mission is to empower you to express your unique
            style through high-quality, on-trend fashion. We’re dedicated to
            making fashion accessible for all by offering a diverse selection
            that inspires confidence.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p className="text-justify">
            At Revora, our vision is to become a global leader in fashion,
            recognized for innovative style and exceptional quality. We strive
            to inspire confidence and creativity, making Revora the preferred
            destination for personal expression..
          </p>
        </div>
      </div>
      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col mb-20 text-sm md:flex-row">
        <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
          <h3 className="text-center font-semibold text-lg text-purple">
            Quality Assurance
          </h3>
          <p className="text-gray-600 text-justify">
            At Revora, quality is our priority. Each product is thoughtfully
            selected and thoroughly checked to meet our standards. Shop
            confidently, knowing every detail reflects our commitment to
            excellence.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
          <h3 className="text-center font-semibold text-lg text-purple">
            Convenience
          </h3>
          <p className="text-gray-600 text-justify">
            Revora offers a seamless shopping experience with effortless
            browsing, quick delivery, easy returns, and flexible payment
            options. Your comfort and satisfaction are always our top
            priorities.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
          <h3 className="text-center font-semibold text-lg text-purple">
            Exceptional Customer Service
          </h3>
          <p className="text-gray-600 text-justify">
            At Revora, we’re committed to delivering outstanding service. Our
            dedicated support team is always ready to help with any questions or
            concerns, making your shopping experience smooth and satisfying.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
