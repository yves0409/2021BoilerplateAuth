import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import noImg from "../../images/noImg.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ prod }) => {
  const { images, title, description, slug } = prod;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : noImg}
          alt={description}
          style={{ height: "150px", objectFit: "cover", className: "m-2" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EyeOutlined className="text-warning" />
          <br />
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" /> <br />
          Add To Cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
