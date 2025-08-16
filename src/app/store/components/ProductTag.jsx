"use client";

const ProductTag = ({ tag, className }) => {
  return (
    <div className={className} style={{ backgroundColor: tag.color }}>
      <span className="text-[11px] leading-none">{tag.text}</span>
    </div>
  );
};

export default ProductTag;
