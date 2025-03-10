import { AboutSection } from "../components/aboutMe/aboutSection/AboutSection";
import { LogoBanner } from "../components/aboutMe/logoBanner/LogoBanner";
import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";


export function AboutMePage() {
  return (
    <main>
      <AuthBreadCrumb/>
      <AboutSection/>
      <LogoBanner/>
    </main>
  )
}