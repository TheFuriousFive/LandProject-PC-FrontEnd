import Header from "@/_components/Header";
import SignInPage from "./signin";
import BackButton from "../../_components/BackButton";

function page() {
  return (
    <div>
      <Header />
      <div className="p-4 md:p-8">
        <BackButton />
      </div>
      <SignInPage />
    </div>
  );
}

export default page;
