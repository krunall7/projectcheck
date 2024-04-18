'use client';

import {FormEvent, useEffect, useState} from "react";
import Header from "@/components/header";

export default function Home() {

    // handle the form submission
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const response = await fetch('/api/projects', {
            method: 'POST',
            body: formData,
        })

        // Handle response if necessary
        const data = await response.json()

        // if the response is successful, redirect to the home page
        if (response.ok) {
            window.location.href = '/'
        } else {
            console.error(data.message)
        }

    }

    return (
        <div>
            <Header/>
        <div className="container  m-auto">

            <form className="gap-4 max-w-xl m-auto" onSubmit={onSubmit}>
                <div>
                    <div className="label">
                        <span className="label-text">Project Name</span>
                    </div>
                    <input type="text" name={"title"} placeholder="Type here" className="input input-bordered w-full max-w-xl"/>
                </div>
                <div>
                    <div className="label">
                        <span className="label-text">Deadline</span>
                    </div>
                    <input type="date" name={"deadline"} className="input input-bordered w-full max-w-xl"/>
                </div>
                <div>
                    <div className="label">
                        <span className="label-text">Project Description</span>
                    </div>
                    <textarea placeholder="Type here"
                              name={"description"}
                              className="textarea h-24 textarea-bordered w-full max-w-xl"/>
                </div>
                <div>
                    <div className="label">
                        <span className="label-text">Project Image</span>
                    </div>
                    <input type="text" name="image" className="input input-bordered w-full max-w-xl"/>
                </div>
                <div className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">Please enter the URL of the image</span>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Add Project</button>
                </div>
            </form>

        </div>
        </div>
    );
}