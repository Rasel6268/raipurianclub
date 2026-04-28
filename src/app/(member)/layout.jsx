import Footer from "@/components/Footer";
import Navbar2 from "@/components/Navbar2";

export default function MemberLayout({ children }) {
  return (
    <>
      <Navbar2 />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
