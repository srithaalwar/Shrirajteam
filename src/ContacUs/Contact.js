import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";
import { baseurl } from './../BaseURL/BaseURL';
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Near Old Dhamtari Road", "Boriya Khurd Raipur 492013"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["9074307248"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["shrirajteam@gmail.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Sat: 9AM - 8PM", "Sun: 10AM - 5PM"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseurl}/leads/`, formData);
      if (res.status === 201 || res.status === 200) {
        Swal.fire("Success!", "Your message has been sent!", "success");
        setFormData({ first_name: "", last_name: "", email: "", phone_number: "", message: "" });
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (


    <div className="contact-page">
              <WebsiteNavbar />


      {/* Hero Section */}
      <section className="contact-hero bg-primary py-5 py-md-3">
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-white ">
            Get In Touch
          </h1>
          {/* <p className="lead text-white-80 mx-auto" style={{ maxWidth: "600px" }}>
            Have questions about our services? We're here to help you with all your real estate needs.
          </p> */}
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h2 className="h1 fw-bold mb-4">
                Contact Information
              </h2>
              <p className="text-muted mb-5">
                Reach out to us through any of these channels. Our team is ready to assist you with all your real estate needs.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item d-flex mb-4">
                    <div className="contact-icon-wrapper me-4">
                      <info.icon className="contact-icon" />
                    </div>
                    <div>
                      <h3 className="h5 fw-semibold mb-1">{info.title}</h3>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-muted small mb-1">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-5 pt-4 border-top">
                <h3 className="h5 fw-semibold mb-3">Follow Us</h3>
                <div className="d-flex gap-3">
                  {[
                    { icon: faInstagram, url: "https://www.instagram.com/shrirajteam/?igsh=YzhjcjVuMGIxZzJq#", label: "Instagram" },
                    { icon: faFacebook, url: "https://www.facebook.com/shrirajteam/", label: "Facebook" },
                    { icon: faXTwitter, url: "https://x.com/shrirajteam", label: "Twitter" },
                    { icon: faYoutube, url: "https://www.youtube.com/@Shrirajteam", label: "YouTube" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link d-flex align-items-center justify-content-center"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      <FontAwesomeIcon icon={social.icon} style={{ fontSize: '1.2rem' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-card card shadow-sm border-0 p-4 p-md-5">
                <div className="d-flex align-items-center mb-4">
                  <MessageCircle className="me-3 text-primary" />
                  <h2 className="h1 fw-bold mb-0">
                    Send Us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="first_name" className="form-label fw-medium">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="last_name" className="form-label fw-medium">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="form-control form-control-lg"
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="phone_number" className="form-label fw-medium">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        placeholder="9074307248"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-medium">
                        Email ID *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="form-control form-control-lg"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-medium">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your property needs..."
                      className="form-control form-control-lg"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 w-md-auto submit-btn"
                    style={{
                      backgroundColor: "rgb(46, 22, 109)",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      padding: "0.75rem 2rem",
                    }}
                  >
                    <Send className="me-2" />
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="contact-map bg-light">
        <div className="container-fluid p-0">
          <div className="map-placeholder d-flex align-items-center justify-content-center">
            <div className="text-center text-muted">
              <MapPin className="map-icon mb-3" />
              <p className="fs-5">Interactive map would be integrated here</p>
              <p className="text-muted">Near Old Dhamtari Road Boriya Khurd Raipur 492013</p>
            </div>
          </div>
        </div>
      </section> */}

      <Footer/>
    </div>
  );
};

export default Contact;