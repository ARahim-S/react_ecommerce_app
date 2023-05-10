import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (item) => {
    navigate(`/products?category=${item.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 z-30 absolute bg-[#fff] w-[270px] rounded-b-md shadow-sm">
      {categoriesData?.map((item, index) => (
        <div
          key={index}
          className={`${styles.normalFlex}`}
          onClick={() => submitHandle(item)}
        >
          <img
            src={item.image_Url}
            alt=""
            style={{
              width: "25px",
              hegiht: "25px",
              objectFit: "contain",
              marginLeft: "10px",
              userSelect: "none",
            }}
          />
          <h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
