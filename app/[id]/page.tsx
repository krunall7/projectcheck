'use client';

import {FormEvent, useEffect, useState} from "react";
import Header from "@/components/header";
import {useRouter} from "next/navigation";

export default function Page({params}: { params: { id: string } }) {


    const [project, setProject] = useState({
        title: '',
        deadline: '',
        description: '',
        image: ''
    });
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (params.id) {
            fetch(`/api/projects/${params.id}`)
                .then(res => res.json())
                .then(data => setProject(data.project))
                .then(() => setLoading(false))
                .then(() => console.log(project))

        }
    }, [params.id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        const response = await fetch(`/api/projects/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: formData.get('title'),
                deadline: formData.get('deadline'),
                description: formData.get('description'),
                image: formData.get('image'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            router.push('/');
        } else {
            const errorData = await response.json();
            console.error(errorData.message);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const response = await fetch(`/api/projects/${params.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                router.push('/');
            }
        }
    };


    return (
        <div>
            <Header/>
            <div className="container  m-auto">

                <form className="max-w-xl mx-auto my-4" onSubmit={handleSubmit}>
                    <div>
                    <div className="label">
                            <span className="label-text">Project Name</span>
                        </div>
                        <input type="text" name={"title"}
                                 value={project.title}
                               onChange={(e) => setProject({...project, title: e.target.value})}
                            placeholder="Type here" className="input input-bordered w-full max-w-xl"/>
                    </div>
                    <div>
                        <div className="label">
                            <span className="label-text">Deadline</span>
                        </div>
                        <input type="date"
                                 value={project.deadline}
                                 onChange={(e) => setProject({...project, deadline: e.target.value})}
                               name={"deadline"} className="input input-bordered w-full max-w-xl"/>
                    </div>
                    <div>
                        <div className="label">
                            <span className="label-text">Project Description</span>
                        </div>
                        <textarea placeholder="Type here"
                                  name={"description"}
                                    value={project.description}
                                    onChange={(e) => setProject({...project, description: e.target.value})}

                                  className="textarea h-24 textarea-bordered w-full max-w-xl"/>
                    </div>
                    <div>
                        <div className="label">
                            <span className="label-text">Project Image</span>
                        </div>
                        <input type="text" name="image"
                                    value={project.image}
                                    onChange={(e) => setProject({...project, image: e.target.value})}
                               className="input input-bordered w-full max-w-xl"/>
                    </div>
                    <div className="label">
                        <span className="label-text-alt"></span>
                        <span className="label-text-alt">Please enter the URL of the image</span>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>Update Project</button>
                        <button type="button" onClick={handleDelete} className="btn btn-error">Delete Project</button>
                    </div>
                </form>

            </div>
        </div>
    );
}