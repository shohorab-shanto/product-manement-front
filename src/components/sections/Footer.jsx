
const Footer = () => {
  return (
    <div className="footer py-4 d-flex flex-lg-column" id="footer">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted fw-bold me-1">2022©</span>
          <span
            className="text-gray-800 text-hover-primary"
          >NAF Inventory</span>
        </div>
        <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
          <li className="menu-item">
            <a href="https://www.nafgroup.org/about-us" target="_blank" className="menu-link px-2">
              About
            </a>
          </li>
          <li className="menu-item">
            <a href="https://www.nafgroup.org/contact-us" target="_blank" className="menu-link px-2">
              Support
            </a>
          </li>
          <li className="menu-item">
            <a href="https://www.nafgroup.org/our-products" target="_blank" className="menu-link px-2">
              Purchase
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
