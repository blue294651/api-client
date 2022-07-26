import React from "react";
import ResourceContent from "./ResourceContent";
import styles from "./Resource.module.scss";
import classnames from "classnames";

type ResourceProps = {
  className?: string;
  resource: Resource;
};

const ResourceTitles: Dictionary = {
  repos_url: "Repos",
};

const Resource = ({ className, resource }: ResourceProps) => {
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.title}>{ResourceTitles[resource.urlName] ?? `(Untitled Section: \"${resource.urlName}\")`}</div>
      <ResourceContent resource={resource} />
    </div>
  );
};

export default Resource;
