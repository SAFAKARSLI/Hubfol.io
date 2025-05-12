import { dark } from "@clerk/themes";
import { Brand } from "./types/brand";
import { PersonIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";

export const extractSlug = (url: string, identifier: string) => {
  const index = url.split("/").indexOf(identifier) + 1; // returns -1 if not found. Hence checking for 0 at the bottom.

  if (index == 0) {
    return null;
  }
  return url.split("/")[index];
};

export const errorCodes = [
  {
    code: "project-not-found",
    message: "Project not found or invalid project indentifier provided.",
  },
];

export const generateProjectSlug = (name: string) => {
  const base62chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Convert a number to Base62
  function toBase62(num: number) {
    let base62 = "";
    while (num > 0) {
      base62 = base62chars[num % 62] + base62;
      num = Math.floor(num / 62);
    }
    return base62;
  }

  // Generate a random Base62 string of fixed length
  function generateRandomBase62(length: number) {
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * base62chars.length);
      result += base62chars[randomIndex];
    }
    return result;
  }

  // Generate a unique Base62 ID by combining timestamp and random string
  function generateUniqueBase62ID(length: number) {
    const timestamp = Date.now(); // Unique timestamp
    const timestampBase62 = toBase62(timestamp); // Convert timestamp to Base62
    const randomBase62 = generateRandomBase62(length - timestampBase62.length); // Generate random string to fill the rest

    return timestampBase62 + randomBase62; // Combine timestamp and random part
  }

  // Generate a Base62 ID of fixed length
  const uniqueBase62ID = generateUniqueBase62ID(10);

  return "p-" + uniqueBase62ID + "-" + name.toLowerCase().replace(/ /g, "-");
};

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const preferredColorOptions: {
  accentColor: colorOptions;
  appearance: appearanceOptions;
} = {
  accentColor: "violet",
  appearance: "dark",
};

export const defultSearchTechValues = {
  loading: false,
  result: [] as Brand[],
  resultVisible: false,
};

export const defaultIconLink =
  "https://s3.amazonaws.com/hubfol.io.project-icons/globe-solid.svg";

export type colorOptions =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

export type grayColorOptions =
  | "gray"
  | "mauve"
  | "slate"
  | "sage"
  | "sand"
  | "auto"
  | "olive"
  | undefined;

export type appearanceOptions = "dark" | "inherit" | "light" | undefined;

export type buttonVariants =
  | "soft"
  | "classic"
  | "solid"
  | "surface"
  | "outline"
  | "ghost"
  | undefined;

export type InputType =
  | "number"
  | "search"
  | "time"
  | "text"
  | "hidden"
  | "tel"
  | "url"
  | "email"
  | "date"
  | "datetime-local"
  | "month"
  | "password"
  | "week"
  | undefined;

export const allowedIconTypes =
  "image/png, image/jpeg, image/jpg, image/svg+xml, application/pdf";

export const links = [
  // {
  //   title: 'Profile',
  //   url: 'profile',
  // },
  {
    title: "Projects",
    url: "projects",
  },
  // {
  //   title: 'Reviews',
  //   url: 'reviews',
  // },
];

export const highlightedLinks = [
  {
    title: "Templates",
    url: "templates",
  },
];

export const activeLink = (url: string) => {
  return url.split("/")[3];
};

export const customThemeClerkAuthenticationComponents = {
  baseTheme: dark,
  variables: {
    colorInputBackground: "#111113",
    colorInputText: "white",
    colorPrimary: "#3f53cf",
    colorTextOnPrimaryBackground: "white",
    colorText: "white",
    colorBackground: "#19191b",
  },
};
