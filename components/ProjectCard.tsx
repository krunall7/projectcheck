export default function ProjectCard({project}: {project: any}) {

    console.log(project);
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={project.image} alt="Shoes"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description.substring(0, 100)}...</p>
                <div className="card-actions justify-end">
                    <a
                        href={`/${project.id}`}
                        className="btn btn-primary">View</a>
                </div>
            </div>
        </div>
    )
}