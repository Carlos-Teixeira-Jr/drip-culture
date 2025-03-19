export function AboutSection() {
  return (
    <section className="md:px-40 px-5 py-8.5 flex flex-col md:flex-row md:gap-52 gap-5">
      <div className="flex-1">
        <h1 className="font-normal text-6xl md:text-8xl">About Me</h1>
      </div>
      <div className="flex-1">
        <h4 className="font-normal">
          I'm a full-stack developer with 2+ years of experience, working on
          real-world projects and leading a team of interns. I specialize in
          Next.js, NestJS, MongoDB, and TypeScript, following best practices
          like Clean Code, SOLID, and OOP. I also have experience in deploys,
          server management, agile (SCRUM), Java, and design. Ready to take on
          new challenges and add value to innovative projects. Let’s connect!
        </h4>
      </div>
    </section>
  );
}
