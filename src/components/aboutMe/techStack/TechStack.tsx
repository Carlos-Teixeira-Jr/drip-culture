import { useEffect, useState } from "react";

type Tech = {
  id: number;
  name: string;
  key: string;
  image: string;
  width: string;
  resume: string;
};

export function TechStack() {
  const [isSelected, setIsSelected] = useState<{ [key: string]: boolean }>({
    next: false,
    react: false,
    tailwind: false,
    node: false,
    mongo: false,
    typescript: false,
    git: false,
    github: false,
    nest: false,
    java: false,
  });

  const [selectedResume, setSelectedResume] = useState("");

  const techs: Tech[] = [
    {
      id: 1,
      name: "Next.js",
      key: "next",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png",
      width: "120px",
      resume:
        "I work with Next.js, leveraging its hybrid rendering (SSR & SSG) to build fast and scalable applications. I use API Routes for backend logic, optimize performance with dynamic routing and image handling, and take advantage of its built-in TypeScript support. I'm also experienced in integrating Next.js with databases, authentication, and edge functions to create efficient and seamless web experiences.",
    },
    {
      id: 2,
      name: "React",
      key: "react",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      width: "",
      resume:
        "I work with React.js, building dynamic and interactive user interfaces using component-based architecture. I leverage hooks for state and lifecycle management, optimize performance with React memoization and context API, and create seamless experiences with React Router for navigation. I also integrate React with modern styling solutions like Tailwind, MUI, and Styled Components, ensuring responsive and scalable applications.",
    },
    {
      id: 3,
      name: "Tailwind",
      key: "tailwind",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
      width: "",
      resume:
        "I work with Tailwind CSS to create highly customizable and responsive designs using utility-first classes. I leverage its flexbox and grid systems for layout management, utilize responsive breakpoints for mobile-first designs, and apply custom theming to match branding requirements. Tailwind allows me to quickly prototype and build scalable, maintainable styles without writing custom CSS, ensuring clean and efficient code.",
    },
    {
      id: 4,
      name: "Node.js",
      key: "node",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
      width: "100px",
      resume:
        "I work with Node.js to build scalable and efficient server-side applications. I leverage its asynchronous, event-driven architecture to handle high concurrency, and use Express.js for creating RESTful APIs. I'm experienced in integrating databases like MongoDB and PostgreSQL, handling authentication with JWT, and building server-side logic for various functionalities. Node.js allows me to create fast, lightweight, and high-performance backends that scale with ease.",
    },
    {
      id: 5,
      name: "MongoDB",
      key: "mongo",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/1200px-MongoDB_Logo.svg.png",
      width: "150px",
      resume:
        "I work with MongoDB to build flexible, scalable databases for applications. I leverage its document-oriented model to store and query data efficiently, using Mongoose for schema validation and data manipulation. I'm experienced in performing complex queries, indexing for optimization, and handling relationships through embedding or referencing. MongoDB's scalability and performance allow me to design databases that grow seamlessly with the application.",
    },
    {
      id: 6,
      name: "Typescript",
      key: "typescript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
      width: "60px",
      resume:
        "I work with TypeScript to enhance the development of scalable and maintainable applications. I use strong typing to catch errors at compile time, implement interfaces and type aliases for clear data structures, and take advantage of generics for reusable and flexible code. TypeScript improves code quality and collaboration by ensuring better tooling, autocompletion, and refactoring support, making the development process more efficient and reliable.",
    },
    {
      id: 7,
      name: "Git",
      key: "git",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/1200px-Git_icon.svg.png",
      width: "65px",
      resume:
        "I work with Git for version control, using it to manage code changes and collaborate efficiently on projects. I follow a structured workflow, creating feature branches, committing frequently with clear messages, and leveraging git rebase and merge for handling conflicts. I also use GitHub and GitLab for remote repositories, collaborating on pull requests, and maintaining code quality through reviews. Git ensures smooth collaboration, code history tracking, and seamless deployment workflows.",
    },
    {
      id: 8,
      name: "Github",
      key: "github",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png",
      width: "70px",
      resume:
        "I work with GitHub to manage and collaborate on projects using version control. I use it for hosting repositories, creating and reviewing pull requests, and managing issues and projects for tracking progress. I leverage GitHub Actions for continuous integration and deployment (CI/CD), automating testing and deployment workflows. GitHub enhances collaboration, version control, and project management, making it a central tool in my development process.",
    },
    {
      id: 9,
      name: "Nest.js",
      key: "nest",
      image:
        "https://www.vhv.rs/dpng/d/498-4989583_nestjs-logo-hd-png-download.png",
      width: "70px",
      resume:
        "I work with NestJS to build scalable and maintainable server-side applications using TypeScript. I leverage its modular architecture to organize features and services, implement dependency injection for clean and testable code, and use decorators for routing, middleware, and validation. NestJS integrates easily with databases, authentication systems, and microservices, providing a robust and efficient framework for developing backend APIs and services.",
    },
    {
      id: 10,
      name: "Java",
      key: "java",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
      width: "50px",
      resume:
        "I work with Java to build robust and high-performance applications. I leverage its object-oriented principles like inheritance, polymorphism, and encapsulation to create maintainable code. I use popular frameworks like Spring for building scalable APIs and microservices, and utilize tools like Hibernate for database management. Java's strong typing and vast ecosystem allow me to develop secure, scalable, and cross-platform applications efficiently.",
    },
  ];

  const handleSelectTech = (tech: Tech) => {
    if (isSelected[tech.key]) {
      setIsSelected({ ...isSelected, [tech.key]: false });
      setSelectedResume("");
      return;
    } else {
      setIsSelected({ ...isSelected, [tech.key]: true });
      setSelectedResume(tech.resume);
    }
  };

  return (
    <section className="flex flex-col gap-4 px-40 py-12 justify-center items-center">
      <div className="flex gap-4 justify-between items-center w-full">
        {techs.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center justify-between h-30"
            onClick={() => handleSelectTech(tech)}
          >
            <img
              src={tech.image}
              alt={tech.name}
              className="w-20"
              style={{ width: tech.width }}
            />
            <h5>{tech.name}</h5>
          </div>
        ))}
      </div>
      <div className="w-2/3 py-8">
        <h4 className="font-normal">{selectedResume}</h4>
      </div>
    </section>
  );
}
