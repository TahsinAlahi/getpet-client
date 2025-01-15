import React from "react";

function AboutUs() {
  return (
    <section className="max-w-screen-md lg:mx-auto mx-4 my-16 text-center font-openSans space-y-2">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-nunito text-black dark:text-white">
        About Us
      </h1>
      <h2 className="text-xl">
        Welcome to <span className="font-bold font-coiny">GetPet</span>, where
        pets find their forever homes!
      </h2>
      <p className="text-lg">
        <span className="font-bold font-satisfy">GetPet</span> was created with
        a vision to make pet adoption simple, accessible, and impactful. Our
        platform bridges the gap between animal shelters and compassionate
        individuals, providing a seamless way to find and adopt pets in need of
        loving homes.
      </p>
      <p className="text-lg">
        Discover pets based on their profiles, learn about their unique traits,
        and connect directly with shelters to begin your adoption journey.
        Whether you’re looking for a playful companion, a loyal protector, or a
        gentle soul, <span className="font-bold font-satisfy">GetPet</span> is
        here to guide you.
      </p>
      <p className="text-lg">
        Our mission is to ensure every pet gets a second chance at life while
        empowering individuals to create meaningful bonds. Together, we can
        transform lives—<i>one paw at a time</i>.
      </p>
    </section>
  );
}

export default AboutUs;
