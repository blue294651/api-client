import React from "react";
import RepoContent from "./Components/RepoContent";

type ResourceContentProps = {
    resource: Resource
}

const ResourceContent = ({resource}: ResourceContentProps) => {
    if (resource.urlName === 'repos_url') {
        return (
            <RepoContent resource={resource}/>
        )
    }

    return (
        <div>
            this one doesnt have any content: {resource.urlName}
        </div>
    )
}

export default ResourceContent