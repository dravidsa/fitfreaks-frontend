import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

const InnerPageLayout = ({ title, children }) => {
  return (
    <section className="section-padding inner-page">
      <div className="container">
        <div className="row">
          <h3 className="inner-page__title">{title}</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
              <FaAngleRight />
            </li>
            <li>{title}</li>
          </ul>
        </div>
        {children}
      </div>
    </section>
  );
};

export default InnerPageLayout;