import React from "react";
import fineaseLogo from "/fineaseLogo.png";
import { FaFacebookF, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10 pb-5">
        <aside>
          <img src={fineaseLogo} className="w-[100px] h-[100px]" alt="" />
          <p>
            <h2 className="font-bold text-secondary text-3xl">
              Fin<span className="text-primary">Ease</span>
            </h2>
            <br />
            Providing reliable tech since 2025
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">
            📍 123 Green Valley Road, Dhaka, Bangladesh
          </a>
          <a className="link link-hover">📞 +880 1700-123456</a>
          <a className="link link-hover">✉️ support@finease.com</a>
          <a className="link link-hover">⏰ Mon - Fri: 9:00 AM - 6:00 PM</a>
        </nav>

        {/* Social media icons */}
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaXTwitter className="w-8 h-8 text-[#1a75ac]" />
            </a>
            <a>
              <FaFacebookF className="w-8 h-8 text-[#1a75ac]" />
            </a>
            <a>
              <FaGithub className="w-8 h-8 text-[#1a75ac]" />
            </a>
            <a>
              <FaLinkedin className="w-8 h-8 text-[#1a75ac]" />
            </a>
          </div>
        </nav>
      </footer>
      <hr className="text-[#1a75ac]" />
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="font-bold text-secondary ml-2">
              Fin<span className="text-primary">Ease</span>
            </span>
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
