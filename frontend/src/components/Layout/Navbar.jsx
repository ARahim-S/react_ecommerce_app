import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems?.map((item, index) => (
        <div key={index} className="flex">
          <Link
            to={item.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
            } font-[500] px-6 cursor-pointer `}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
