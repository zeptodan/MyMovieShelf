import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="w-full bg-blue-950 p-8 flex flex-col md:flex-row md:justify-between items-center">
            <a href="/" className="text-2xl lg:text-3xl text-crimsonRed justify-center my-4">My Movie Shelf</a>
            <p className="text-sm md:self-end md:order-1 order-3 mt-4">© 2025 My Movie Shelf. All rights reserved.</p>
            <div className="flex flex-col items-center my-4 order-2">
                <p className="lg:text-xl">Created by Muhammad Anas</p>
                <p className="lg:text-xl my-2">Contact Me</p>
                <a href="https://www.linkedin.com/in/muhammad-anas-alam/" target="_blank" rel="noopener noreferrer" className="hover:text-crimsonRed">
                    <FaLinkedin className="inline-block mr-2" />
                    LinkedIn
                </a>           
            </div>
        </footer>
    );
}
export default Footer;