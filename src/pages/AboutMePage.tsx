import { AboutSection } from "../components/aboutMe/aboutSection/AboutSection";
import { LogoBanner } from "../components/aboutMe/logoBanner/LogoBanner";
import { TechStack } from "../components/aboutMe/techStack/TechStack";
import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";


export function AboutMePage() {
  return (
    <main>
      <AuthBreadCrumb/>
      <AboutSection/>
      <LogoBanner/>
      <TechStack/>
    </main>
  )
}