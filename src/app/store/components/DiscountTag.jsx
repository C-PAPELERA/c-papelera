"use client";

const DiscountTag = ({ tag, className }) => {
  return (
    <div className={className} style={{ backgroundColor: '#012F49' }}>
      <span className="text-[13px] leading-none">{tag}</span>
    </div>
  );
};

export default DiscountTag;
