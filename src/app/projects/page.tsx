import { Metadata } from 'next';
import BasePage from '@/components/base/BasePage';
import projectsData from '@/lib/projectsData';
import ProjectPreview from '@/components/projects/ProjectPreview';

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
    <div className={`mx-auto w-[95%] md:w-full`}>
      <BasePage title={`Projects`} description={``}>
        <div className={`mt-2 md:mt-4 grid grid-cols-1 sm:grid-cols-2 min-[1150px]:grid-cols-3 gap-4 sm:gap-5 mx-auto justify-center items-stretch`}>
          {projectsData.map((project: any, index: number) => (
            <ProjectPreview key={project.name} data={project} />
          ))}
        </div>
      </BasePage>
    </div>
  );
};

export default ProjectsPage;
