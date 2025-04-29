import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { api } from "../lib/api";
import { GridLoader } from "react-spinners";
import { Service, Faq } from "../lib/types";
import Button from "../components/Button";
import AccordionItem from "../components/AccordionItem";
import { FaPhoneFlip } from "react-icons/fa6";
import { LuMessageSquareShare } from "react-icons/lu";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState<Service[]>();
  const [faqs, setFaqs] = useState<Faq[]>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesResponse, faqsResponse] = await Promise.all([
        api.get(`/services`),
        api.get("/faqs"),
      ]);

      setServices(servicesResponse.data);
      setFaqs(faqsResponse.data);
    } catch (err: any) {
      if (err.response)
        console.error(err.response?.data?.message || "Failed to get data.");
    }
  };

  const handleContact = () => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `tel:${import.meta.env.VITE_PHONE_NUMBER}`;
    } else {
      window.location.href = `mailto:${
        import.meta.env.VITE_EMAIL_ADDRESS
      }?subject=Project Inquiry`;
    }
  };

  const handleSendMessage = async () => {
    const token = captchaRef.current?.getValue();
    if (!token) {
      alert("Please verify you're not a robot.");
      return;
    }

    try {
      await api.post("/messages", {
        name,
        email,
        message,
        captcha: token,
      });
      captchaRef.current?.reset();
      alert("Message sent!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="bg-rose-50 flex flex-col">
      <Navbar active="services" />

      <main className="flex-1 flex flex-col items-center justify-center px-6 mt-14">
        <div className="text-center mb-8 space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-indigo-950">
            My Services
          </h1>

          <p className="text-lg text-indigo-950">
            I offer a range of creative services that can help you build a solid
            visual identity, <br className="hidden md:block" /> enhance user
            experiences, and stand out in the digital world.
          </p>
        </div>

        {services ? (
          <div className="overflow-x-auto px-4 mb-6 mt-4 lg:mt-2">
            <table className="min-w-full bg-white border rounded-lg shadow-lg">
              <thead>
                <tr className="bg-indigo-950 text-white">
                  <th className="px-6 py-3 text-left">Service</th>
                  <th className="px-6 py-3 text-left hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index} className="hover:bg-rose-50">
                    <td className="px-6 py-4">{service.name}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {service.description}
                    </td>
                    <td className="px-6 py-4">{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <GridLoader
            size={35}
            color="#1E1A4D"
            margin={20}
            className="mx-auto my-12"
          />
        )}
      </main>

      <section className="min-w-screen text-center px-6 py-12 mt-12 mb-16 px-4 max-w-3xl mx-auto bg-indigo-950 text-white">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-4 italic">
          Ready to start your next project?
        </h1>
        <p className="text-lg mb-8 text-indigo-100">
          Whether you need a full rebrand, a stunning website, or just some
          <br className="hidden md:block" />
          quick design help, I'm here to bring your vision to life.
        </p>
        <Button
          text={"Contact me"}
          colors={"text-indigo-950 bg-rose-50 hover:bg-indigo-50 font-semibold"}
          action={handleContact}
          icon={<FaPhoneFlip />}
        />
      </section>

      <section className="w-full bg-rose-50 px-4 pb-20">
        <div className="max-w-3xl mx-auto text-indigo-950">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h1>
          {faqs ? (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  title={faq.question}
                  content={faq.answer}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center my-12">
              <GridLoader size={35} color="#1E1A4D" margin={20} />
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-indigo-950 text-white py-16 px-6 mb-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-semibold italic">
            Let’s turn your vision into reality!
          </h2>
          <p className="text-lg text-indigo-100">
            I believe that every project is an opportunity to create something
            exceptional. With a strong focus on design, usability, and
            performance, I help brands express themselves in unique and engaging
            ways.
          </p>
        </div>
      </section>

      <section className="w-full px-4 pb-20 bg-rose-50">
        <div className="max-w-3xl mx-auto text-indigo-950">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
            Send me a Message
          </h2>
          <p className="text-center text-lg text-indigo-950 mb-8">
            Prefer to write instead? Send me a message directly here and I’ll
            get back to you soon.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800 resize-none overflow-y-scroll"
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE}
                ref={captchaRef}
              />

              <Button
                type="submit"
                text="Send"
                colors="text-white bg-indigo-950 hover:bg-indigo-900"
                icon={<LuMessageSquareShare />}
              />
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
