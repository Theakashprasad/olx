import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
console.log('fdghdf',location.state);

  return (
    <div className=" items-center ">
  <div className="flex flex-col items-center">
    <img src={location?.state?.data?.imageURL} className="h-96 w-80" alt="Product Image" />
  </div>
  <div className="ml-8 ">
    <h1 className="font-bold text-3xl">$ {location?.state?.data?.price}</h1>
    <h1 className="mt-5">
      <span className="font-semibold">Category</span> :{" "}
      {location?.state?.data?.category}
    </h1>
    <h1 className="mt-5">
      <span className="font-semibold">Name</span> :{" "}
      {location?.state?.data?.name}
    </h1>
    <h1 className="mt-5">
      <span className="font-semibold">Description</span> : Good product
    </h1>
  </div>
</div>


  );
};

export default Details;
