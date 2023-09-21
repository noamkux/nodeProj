import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="component-container container header mt-5">
      <motion.div whileHover={{ scale: 1.1 }}>
        <h1 className="display-5 text-center mt-5">About Us</h1>
        <p
          className="text-center"
          style={{
            marginBottom: "50px",
            paddingLeft: "100px",
            paddingRight: "100px",
          }}
        >
          Welcome to our BCard website! We are dedicated to providing a platform
          that connects businesses and individuals seeking services. Our mission
          is to make it easy for you to find the right professional for your
          needs or to showcase your own business.
        </p>
      </motion.div>
      <div className="text-center">
        <motion.div whileHover={{ scale: 1.1 }}>
          <h2 className="display-6">Why Choose BCard</h2>
          <p>
            Choosing BCard offers several benefits. Whether you're a business
            owner or someone seeking services, our platform provides the
            following advantages:
          </p>
        </motion.div>
        <ul className="mb-5">
          <motion.p whileHover={{ scale: 1.1 }}>
            * Wide range of categories to choose from
          </motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>
            * Easy access to detailed business profiles
          </motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>
            * User-friendly interface for smooth navigation
          </motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>
            * Opportunity to showcase your business to a wider audience
          </motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>
            * Efficient communication between businesses and customers
          </motion.p>
        </ul>
      </div>
      <div className="row text-center pb-5">
        <motion.div whileHover={{ scale: 1.1 }} className="col-md-4">
          <h2>Our Vision</h2>
          <p>
            Our vision is to create a vibrant community where businesses and
            service providers can connect with their target audience. We believe
            in fostering meaningful relationships and helping people discover
            services that align with their needs.
          </p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="col-md-4">
          <h2>How It Works</h2>
          <p>
            BCard is designed to simplify the process of finding and connecting
            with businesses. Our platform features a comprehensive list of
            businesses and services across various categories. You can easily
            navigate through the listings, explore detailed information about
            each business, and make informed decisions.
          </p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="col-md-4">
          <h2>Get Started</h2>
          <p>
            Ready to explore what BCard has to offer? Browse through our
            listings, discover top-notch businesses, and connect with
            professionals who can cater to your needs. If you're a business
            owner, don't miss the opportunity to join our community and reach
            potential customers.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
