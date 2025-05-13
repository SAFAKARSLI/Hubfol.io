"use client";
import React, { useEffect } from "react";
import { Flex, Radio, Spinner, Text } from "@radix-ui/themes";
import { set } from "lodash";
import FormInput from "../../FormInput";
import FileInput from "../project-info/FileInput";
import * as Form from "@radix-ui/react-form";
import InputLabel from "../../InputLabel";
import { baseUrl } from "@/utils";
import { useParams } from "next/navigation";
import Project from "@/types/project";

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
};

function FrameOptionsForm({ editFormData }: Props) {
  const [projectType, setProjectType] = React.useState("URL");
  const [project, setProject] = React.useState<Project>();
  const { projectUUID } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`${baseUrl}/api/projects/${projectUUID}`, {
        next: { tags: ["projects"] },
      });
      const data = (await response.json()) as Project;
      setProject(data);
      setProjectType(data.type);
    };

    fetchProject();
  }, []);

  return (
    <Spinner loading={!project} className="flex flex-col gap-4">
      {/* <input type="hidden" name="project-type" value={projectType} /> */}
      <input type="hidden" name="projectId" value={projectUUID} />
      <Text as="div" size="4" weight="bold">
        Project Type
      </Text>
      <Flex align="start" direction="column" gap="1">
        <Flex asChild gap="2">
          <Text as="label" size="2">
            <Radio
              name="type"
              value="URL"
              onChange={() => setProjectType("URL")}
              checked={projectType == "URL"}
            />
            Web Link
          </Text>
        </Flex>

        <Flex asChild gap="2">
          <Text as="label" size="2">
            <Radio
              name="type"
              value="FILE"
              onChange={() => setProjectType("FILE")}
              checked={projectType == "FILE"}
            />
            File
          </Text>
        </Flex>
      </Flex>
      {projectType === "URL" ? (
        <FormInput
          name="content"
          placeholder="Enter the URL (e.g. https://hubfol.io)"
          message="You must provide a valid URL. (must include http:// or https://)"
          defaultValue={project?.type == "URL" ? project?.content : ""}
          type="url"
        />
      ) : (
        <Form.Field name="project-icon">
          <FileInput
            bucketName="hubfol.io.file-projects"
            formDataSlug="content"
            accept=".pdf"
            editFormData={editFormData!}
            defaultValue={project?.type == "FILE" ? project?.content : ""}
          />
        </Form.Field>
      )}
    </Spinner>
  );
}

export default FrameOptionsForm;
