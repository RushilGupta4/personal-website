import { Metadata } from 'next';
import BasePage from '@/components/base/BasePage';
import projectsData from '@/lib/projectsData';
import ProjectPreview from '@/components/projects/ProjectPreview';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Explore my portfolio of projects and see what I've been working on. From web development to machine learning, I showcase my skills and experience in this page.",
  alternates: {
    canonical: `/projects`
  }
};

const ProjectsPage = async () => {
  if (projectsData.length < 1) {
    return (
      <div className={`w-full h-1/2 mx-auto text-center my-auto mt-[20vh] text-slate-100 text-5xl md:text-6xl lg:text-7xl font-[600]`}>
        COMING SOON
      </div>
    );
  }
  return (
    <BasePage title={`Projects`} description={`Explore my portfolio of projects and see what I've been working on!`}>
      <div
        className={cn(
          `mt-4 mb-8 2xl:mb-10 4xl:mb-12 md:mt-4 md:mb-10 mx-auto gap-6 md:gap-8 justify-center items-stretch grid grid-cols-1 md:grid-cols-2 4xl:grid-cols-3`
        )}
      >
        {projectsData.map((project: any, index: number) => (
          <ProjectPreview key={project.name} data={project} />
        ))}
      </div>
    </BasePage>
  );
};

export default ProjectsPage;
