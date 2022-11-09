import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Review = () => {
  const { user } = useContext(AuthContext);
  const { _id, title, img, price, rating } = useLoaderData();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const opinion = form.opinion.value;
    console.log(name, opinion, user?.photoURL);
    const review = {
      service_id: _id,
      email: user?.email,
      userImg: user?.photoURL,
      Img: img,
      time: new Date(),
      price,
      rating,
      name,
      title,
      opinion,
    };
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("We got our review");
          form.reset();
          navigate("/services");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-3">
        <h2 className="text-3xl font-bold text-slate-600">{title}</h2>
        <div className="flex">
          <input
            className="w-full mr-2 first-line: px-2 my-4"
            type="text"
            name="name"
            placeholder="Your Name"
            defaultValue={user?.displayName}
            required
          />
          <input
            className="w-full ml-2 first-line: px-2 my-4"
            type="email"
            name="email"
            defaultValue={user?.email}
            readOnly
          />
          <br />
        </div>
        <textarea
          name="opinion"
          className="w-full px-2 my-4"
          placeholder="Write Your Opinion"
        ></textarea>
        <Button type="submit" gradientMonochrome="teal" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Review;
