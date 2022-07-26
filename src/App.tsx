import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Resource from "./Global/Components/Resource/Resource";

type OrgResponse = Dictionary<string | number | null>;

const ALLOWED_URLS = [];

const App = () => {
  const { get } = axios;
  const [resourceUrls, setResourceUrls] = useState<Dictionary | undefined>();
  const [resourceData, setResourceData] = useState<Resource[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [createdAt, setCreatedAt] = useState<string>();
  const [updatedAt, setUpdatedAt] = useState<string>();
  const working = loading || initializing;

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const data = (
          await get<OrgResponse>("https://api.github.com/orgs/boomtownroi")
        )?.data;

        if (typeof data["created_at"] === "string")
          setCreatedAt(data["created_at"]);
        if (typeof data["updated_at"] === "string")
          setUpdatedAt(data["updated_at"]);

        const dataUrls = Object.entries(data)
          .filter((entry) => entry[0].includes("_url") && entry[1])
          .reduce((a, b) => {
            if (b[0].includes("_url") && b[1] && typeof b[1] === "string") {
              const original = a as Dictionary;
              original[b[0]] = b[1];
              return a;
            }
            return a;
          }, {}) as Dictionary;

        setResourceUrls(dataUrls);

        // do fetch of child data
        const resources = (
          await Promise.all(
            Object.entries(dataUrls).map((du) =>
              get(du[1])
                .then((response) => {
                  return { urlName: du[0], items: response.data };
                })
                .catch((error) => {
                  return undefined;
                })
            )
          )
        ).filter((r) => r) as Resource[];

        console.log("resourceData", resources);

        setResourceData(resources);
      } catch (error) {
        console.error("not good", error);
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    };
    fetch();
  }, []);

  const renderContent = () => {
    if (working) {
      return <div>Loading...</div>;
    }
    if (!resourceData?.length) {
      return <div>No resources yet</div>;
    }
    return (
      <div>
        {resourceData.map((rd) => (
          <Resource className={styles.resource} resource={rd} />
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <div className={styles.container}>
        <div className={styles.title}>API Client App</div>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
