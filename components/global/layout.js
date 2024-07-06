import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ title, keywords, description, username , children }) {
  console.log ( "got username as -"+ username +"-") ; 
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header username={username} />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "FitFreaks - a Fitness community ",
  description: "Event Booking , Ticketing  and Fitness coaching platform ",
  keywords: "events ,fitness ,groups, coaching"
};
