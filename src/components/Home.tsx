import { Link } from "react-router-dom";

// Define the Product type
type Product = {
  name: string;
  imageURL: string;
 price: string;
 category: string;
 createdAt: string;
};

// Use the Product type in your productProps
type productProps = {
 products: Product[];
 search: string;
};

const Home = (props: productProps) => {
 return (
    <div className="grid grid-cols-4 p-5">
      {props.products
        .filter((data) => data.name.includes(props.search))
        .map((data, index) => {
          return (
            <Link key={index} to="/details" state={{ data: data }}>
              <div className="border border-spacing-1 p-2 ml-3 mt-3">
                <img src={data.imageURL} className="w-60 h-48" />
                <h1 className="font-bold text-xl">$ {data.price}</h1>
                <h1>{data.name}</h1>
                <h1>{data.category}</h1>
              </div>
            </Link>
          );
        })}
    </div>
 );
};

export default Home;
