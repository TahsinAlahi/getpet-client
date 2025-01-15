function CallToActionCard({ imageUrl, heading, paragraph, alt }) {
  return (
    <div className="w-full grid grid-cols-1 gap-5 md:gap-3 md:grid-cols-2 px-5 place-items-center text-black dark:text-white">
      <img
        src={imageUrl}
        alt={alt}
        className="md:w-full h-96 object-cover rounded-3xl order-1 md:order-2 select-none"
      />
      <div className="h-full order-2 md:order-1 flex flex-col justify-center items-center text-center md:w-3/4 space-y-3">
        <h1 className="font-nunito text-3xl">{heading}</h1>
        <p className="font-openSans text-base">{paragraph}</p>
      </div>
    </div>
  );
}

export default CallToActionCard;
