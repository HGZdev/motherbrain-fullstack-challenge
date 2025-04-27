import React from "react";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";

const cases: { name: string; newSearchParams: string; description?: string }[] =
  [
    {
      name: "Case 1",
      newSearchParams:
        "interval=month&orgIds=7614f15f-3a92-40dc-b279-1a4c181798f0%2Ce74e73ca-b342-4ce1-9a52-4ba070b2ef63",
      description:
        "This case shows the funding rounds for two organizations over a month interval.",
    },
    {
      name: "Case 2",
      newSearchParams:
        "interval=month&orgIds=36aa367d-793e-461d-8b3a-d88ce48afe23%2C979f41e9-fe2e-491e-86ad-3f9b89c9e86d%2C675684d6-8e74-4a8d-9ba8-288d77496d38%2C8105e755-29ae-4c7f-8bf8-dcd937ebab2f",
      description:
        "This case shows the funding rounds for two organizations over a month interval.",
    },
    {
      name: "Case 3",
      newSearchParams:
        "interval=quarter&orgIds=4498efe5-24eb-4acd-b5c5-fe7b11f2e230%2C0458443b-49a5-451f-b829-2a663666ae6f%2C5f6326c4-1365-4ad5-a3d0-076c1fa685bf%2C6a1ac500-549c-4bd3-8a54-287ca47df45d",
      description:
        "This case shows the funding rounds for a single organization over a month interval.",
    },
    {
      name: "Case 4",
      newSearchParams:
        "interval=quarter&orgIds=fa1cc616-a13a-476e-b99f-6ca0dfdb05db%2C94a4002f-76a5-4574-9e0d-f8b762be9c8a",
    },
    {
      name: "Case 5",
      newSearchParams:
        "interval=month&orgIds=d7e0c55a-d2e5-48d3-b50c-8990cda4a291%2Cbcc1676d-c396-4793-bbdd-cf5656282ca0%2Ce1128500-aa00-4647-a567-b95c10439a17%2Ce3d8dbf1-31b2-49eb-bf0f-a96c29717ba7%2C15ddd20f-99e4-4f77-9251-a5d07fccb589",
    },
  ];

const ExamplesPanel: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Examples</h2>
        <div className="flex gap-4 justify-center ">
          {cases.map(({ name, newSearchParams }, i) => (
            <a key={i} target="_blank" href={`?${newSearchParams}`}>
              <Button size="lg" variant="accent">
                {name}
              </Button>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamplesPanel;
