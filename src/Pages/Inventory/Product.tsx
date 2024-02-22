import img1 from "../../assets/tshirt/time.png";
import img2 from "../../assets/tshirt/black.png";
import img3 from "../../assets/tshirt/yellow.png";
import img4 from "../../assets/tshirt/white.png";
import img5 from "../../assets/tshirt/blue.png";
import img6 from "../../assets/tshirt/white full sleeve.png";
import img7 from "../../assets/tshirt/beer.png";
import img8 from "../../assets/tshirt/2 piece.png";
const Product = () => {
    const product = [
     {
      id:1,  
      title: "Time Travel T-Shirt",
      img: img1,
      price: (Math.random() * (200 -  10) +  10).toFixed(2)
    },
     {
      id:2, 
      title: "Dark Knight T-Shirt",
      img: img2,
      price: (Math.random() * (400 -  10) +  10).toFixed(2)
    },
     {
      id:3,
      title: "Sunny Side T-Shirt",
      img: img3,
      price: (Math.random() * (100 -  10) +  10).toFixed(2)
    },
     {
      id:4,
      title: "Pure White T-Shirt",
      img: img4,
      price: (Math.random() * (100 -  10) +  10).toFixed(2)
    },
     {
      id:5,
      title: "Sky Blue T-Shirt",
      img: img5,
      price: (Math.random() * (100 -  10) +  10).toFixed(2)
    },
     {
      id:6,
      title: "White Full Sleeve",
      img: img6,
      price: (Math.random() * (200 -  10) +  10).toFixed(2)
    },
     {
      id:7,
      title: "Beer Belly T-Shirt",
      img: img7,
      price: (Math.random() * (100 -  10) +  10).toFixed(2)
    },
     {
      id:8,
      title: "Double Trouble T-Shirt",
      img: img8,
      price: (Math.random() * (100 -  10) +  10).toFixed(2)
    },
    ]
    return (
        <div className="mt-[150px] max-w-[1440px] mx-auto">
            <div className="text-center flex flex-col justify-center gap-3">
                <h1 className="text-[35px] font-bold">Our Products </h1>
                <h1 className="text-[18px] text-blue-gray-400">Explore Our Products</h1>
            </div>
             <div className="grid grid-cols-4 gap-6 mt-[50px] ">
               {
                 product.map(data=>(
                    <div className=" group " key={data.id}>
                        
                        <div className="relative">
                        <img className="w-[250px] rounded-md mx-auto px-[50px] py-[40px] bg-blue-gray-200" src={data.img} alt="" />
                        <div>
                          <button className="hidden group-hover:flex justify-center items-center w-[150px] py-1 bg-deep-purple-600 text-white rounded-full absolute top-1/2 right-1/4 group-hover:backdrop-blur-md duration-200  ">Add to Cart</button>
                        </div>
                        </div>
                       <div className=" mt-5  gap-1">
                       <h1 className="text-[20px] text-center font-bold">{data.title} </h1>
                        <h1 className="text-gray-600 text-center ">Price: ${data.price} </h1>
                       </div>
                    </div>
                    ))
               }
             </div>
        </div>
    );
};

export default Product;