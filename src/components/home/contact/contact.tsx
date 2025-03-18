import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  InstagramIcon,
  LoaderCircleIcon,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SendMail } from "@/actions/send";

const Contact = ({ fadeIn }: { fadeIn: any }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const { error } = await SendMail({ email, message });
      if (!error) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 10000);
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message",
        });
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 10000);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred",
      });
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-amber-900/5 to-[#0a0d14]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4">
            Send a Message
          </Badge>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Contact the Crew
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg blur opacity-10 group-hover:opacity-5 transition duration-500"></div>
              <div className="relative bg-amber-900/10 backdrop-blur-sm p-5 rounded-lg border border-amber-900/30">
                {/* Heading */}
                <h3 className="text-base lg:text-lg font-bold text-white mb-4 flex items-center">
                  <Mail className="text-amber-400 mr-2" />
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-amber-100 mb-2 text-xs lg:text-base"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0a0d14]/80 border border-amber-900/30 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-base lg:placeholder:text-base text-amber-100 text-sm lg:text-base"
                      placeholder="user@gmail.com"
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-amber-100 mb-2 text-xs lg:text-base"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-[#0a0d14]/80 border border-amber-900/30 rounded-md 
            focus:outline-none focus:ring-2 placeholder:text-xs lg:placeholder:text-base focus:ring-amber-500/50 text-amber-100 text-sm lg:text-base  "
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Status */}
                  {submitStatus.type && (
                    <div
                      className={`text-xs lg:text-base ${
                        submitStatus.type === "success"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="relative inline-flex items-center group"
                    >
                      <div className="relative bg-[#0a0d14] px-6 py-3  gap-2 rounded-md flex items-center">
                        {!isSubmitting && (
                          <Send className="mr-2 h-5 w-5 text-amber-400" />
                        )}
                        <p className="text-white text-sm lg:text-base font-medium">
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </p>
                        {isSubmitting && (
                          <LoaderCircleIcon className="mr-2 h-5 w-5 animate-spin text-amber-400" />
                        )}
                      </div>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group h-[320px]"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative h-full rounded-lg overflow-hidden border border-amber-900/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.3950118012062!2d74.93468037804408!3d12.874059184628468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3585ea5927d6f%3A0xc65abe4f89ccf8ab!2sSrinivas%20Institute%20Of%20Technology%20(S.I.T)!5e1!3m2!1sen!2sin!4v1741741821746!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>

              {/* Overlay with pirate elements */}
              <div className="absolute top-4 right-4 bg-[#0a0d14]/80 backdrop-blur-sm p-3 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mt-2 font-mono text-xs text-amber-400">
                  $ locate treasure_island
                </div>
              </div>
            </div>
            <div className="my-2 flex items-center justify-center lg:justify-start">
              <h3 className="text-lg  text-white my-4 mr-3">Follow us on</h3>
              <div className="flex space-x-4">
                <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/mca.zone/"
                    className="w-10 h-10 rounded-full bg-amber-900/20 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-300"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
