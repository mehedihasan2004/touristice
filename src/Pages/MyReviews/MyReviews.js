import { Card } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider";
import MyReview from "./MyReview";
import "react-toastify/dist/ReactToastify.css";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/myreviews?email=${user?.email}`)
      .then((res) => res.json())
      .then((revs) => {
        setReviews(revs);
        setRefresh(!refresh);
      })
      .catch((err) => console.error("Error", err));
  }, [user?.email, refresh]);
  const deleteReview = (id) => {
    const agree = window.confirm("Are sure to delete this review !");
    if (agree) {
      fetch(`http://localhost:5000/reviews/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount) {
            toast.info("🦄 Wow so easy!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((err) => console.error("Error", err));
    }
  };
  return (
    <div>
      <div className="w-full">
        <Card>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            My Reviews
          </h5>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.length === 0 ? (
              <div className="flex justify-center md:my-48">
                <h2 className="text-5xl font-bold text-slate-400">
                  No reviews were added yet !
                </h2>
              </div>
            ) : (
              <>
                {reviews.map((review) => (
                  <MyReview
                    key={review._id}
                    review={review}
                    deleteReview={deleteReview}
                  />
                ))}
              </>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default MyReviews;