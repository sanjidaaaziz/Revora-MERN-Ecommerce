import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mt-10 text-center ">
      <p className="text-2xl font-medium text-gray-800">
        Get <span className="text-purple">20%</span> Off Instantly – Just Hit
        Subscribe!
      </p>
      <p className="mt-3 text-gray-400">
        Subscribe today and enjoy exclusive savings!
      </p>
      <form
        onClick={onSubmitHandler}
        className="flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2"
      >
        <input
          className="w-full outline-none sm:flex-1"
          type="email"
          placeholder="hello@gmail.com"
          required
        />
        <button
          type="submit"
          className="px-10 py-4 text-xs text-white bg-purple"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
