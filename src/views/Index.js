import React, { Fragment } from "react";

// reactstrap components
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionDownload from "views/index-sections/SectionDownload.js";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <Fragment>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <SectionNucleoIcons />
        <SectionCarousel />
        <SectionExamples />
        <SectionDownload />
        <DemoFooter />
      </div>
    </Fragment>
  );
}

export default Index;
