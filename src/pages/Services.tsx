import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { api } from "../lib/api";
import { GridLoader } from "react-spinners";
import { Service } from "../lib/types";

const Services = () => {
  const [services, setServices] = useState<Service[]>();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const result = await api.get(`/services`);
      setServices(result.data);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to get services.");
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

      <Footer />
    </div>
  );
};

export default Services;
