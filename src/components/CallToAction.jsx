import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CallToActionCard from "./CallToActionCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const callToActionOptions = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1598681244895-1786022fe447?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heading: "Adopt, Love, Transform",
    paragraph:
      "Every pet deserves a second chance at happiness. Open your heart and home to a furry friend, and experience the unconditional love they bring.",
    alt: "A happy man with his dog",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1638741280504-ab021cb27f3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGdpcmwlMjB3aXRoJTIwYSUyMHBldCUyMGJpcmR8ZW58MHx8MHx8fDI%3D",
    heading: "Be Their Forever Family",
    paragraph:
      "Millions of pets are waiting for someone like you. Adopt today and give them the life they deserve while finding joy beyond measure.",
    alt: "A girl with her dog",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1501743029101-21a00d6a3fb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heading: "Bring Joy to Your Life",
    paragraph:
      "A simple act of kindness can save a life. Adopt a pet and build a lifelong bond filled with love, laughter, and companionship.",
    alt: "A girl and her cat",
  },
];

function CallToAction() {
  return (
    <section>
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-nunito text-black dark:text-white">
        Come Forward
      </h1>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        speed={1700}
        loop
        className="w-full h-full"
      >
        {callToActionOptions.map((option, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <CallToActionCard
              imageUrl={option.imageUrl}
              heading={option.heading}
              paragraph={option.paragraph}
              alt={option.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default CallToAction;
