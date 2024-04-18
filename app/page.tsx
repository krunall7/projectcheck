"use client";
import {useEffect, useState} from "react";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/components/header";

export default function Home() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data.projects));
    }, []);

    console.log(projects);

    return (
        <div>
            <Header/>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
