import Image from "next/image";

const CertificationTable = () => {
  const benefits = [
    {
      img: "url",
      title: "Texto",
      subtitle: "Texto",
    },
    {
      img: "url",
      title: "Texto",
      subtitle: "Texto",
    },
    {
      img: "url",
      title: "Texto",
      subtitle: "Texto",
    },
  ];

  return (
    <div className="grid grid-cols-3 border border-black max-w-md">
      {benefits.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center text-center border border-black p-4"
        >
          <Image
            src={item.img}
            alt={item.title}
            width={60}
            height={60}
            className="size-16 mb-2"
          />
          <p className="font-semibold">{item.title}</p>
          <p>{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default CertificationTable;
