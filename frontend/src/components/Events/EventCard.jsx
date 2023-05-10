import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg  lg:flex p-2  ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          tempora est architecto quidem consequuntur beatae corporis rerum
          ratione voluptate inventore iure reprehenderit ad doloribus reiciendis
          quas commodi, odio dolor maxime aut soluta nemo? Maxime culpa quos
          consequatur! Dolorem itaque rerum eum beatae ipsum recusandae iusto
          quos voluptate cupiditate temporibus. Commodi, ratione ex officia
          veniam laudantium officiis iure doloribus consequatur est cupiditate,
          ad hic a itaque fugit porro! Cupiditate exercitationem officia eaque
          quaerat esse pariatur sunt vitae voluptate aperiam odit porro, aliquid
          nisi ipsum maxime quae alias? Similique accusantium fugiat praesentium
          numquam, vitae pariatur, sed illum ipsum autem nostrum voluptatum
          quae.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
        <br />
        <div className="flex items-center">
          <Link to={`/`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
