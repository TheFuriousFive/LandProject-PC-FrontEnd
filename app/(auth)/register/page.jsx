import Header from "../../_components/Header";
import CreateAccountPage from "./signup";
import BackButton from "../../_components/BackButton";

function page() {
  return (
    <div>
      <Header />
      <div className="p-4 md:p-8">
        <BackButton />
      </div>
      <CreateAccountPage />
    </div>
  );
}

export default page;
