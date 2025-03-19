import { AboutSection } from "../components/aboutMe/aboutSection/AboutSection";
import { LogoBanner } from "../components/aboutMe/logoBanner/LogoBanner";
import { TechStack } from "../components/aboutMe/techStack/TechStack";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";


export function AboutMePage() {
  return (
    <main>
      <BreadCrumb/>
      <AboutSection/>
      <LogoBanner/>
      <TechStack/>
    </main>
  )
}