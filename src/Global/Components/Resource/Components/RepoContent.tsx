import React from "react";
import Card from "../../Cards/Card";
import styles from "./RepoContent.module.scss"

type RepoContentProps = {
  resource: Resource;
};

type RepoItem = {
  id: string;
  name: string;
  html_url: string;
  description: string;
  language: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
};

const RepoContent = ({ resource }: RepoContentProps) => {
  const items = resource.items as RepoItem[];

  return (
    <div className={styles.container}>
      {items.map((i) => (
        <Card className={styles.card}>
          <div>{i.name}</div>
        </Card>
      ))}
    </div>
  );
};

export default RepoContent;
