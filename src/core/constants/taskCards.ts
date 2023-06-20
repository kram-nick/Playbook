import { Data } from "../models";

import first_icon from "../../assets/photos/active/pb-icon-first.svg";
import second_icon from "../../assets/photos/active/pb-icon-second.svg";
import third_icon from "../../assets/photos/active/pb-icon-third.svg";
import fourth_icon from "../../assets/photos/active/pb-icon-fourth.svg";

export const taskcards: Data.TaskCard[] = [
  {
    id: "1",
    tag: "Launch Product",
    name: "Expand market presence through strategic partnerships",
    description:
      "Identify and establish partnerships with complementary businesses or influential industry players to leverage their networks, resources, and expertise, thereby expanding market reach and gaining a competitive edge.",
    status: "Not started",
    due_date: "Due Jul 24",
    playbook: {
      id: "10",
      title: "Engineering Playbook 2023",
      user: "Nick Kramarenko",
      image: first_icon,
      page: "Page 4",
    },
  },
  {
    id: "2",
    tag: "Launch Product",
    name: "Foster a culture of innovation and employee empowerment",
    description:
      "Identify and establish partnerships with complementary businesses or influential industry players to leverage their networks, resources, and expertise, thereby expanding market reach and gaining a competitive edge.",
    status: "Open",
    due_date: "Due Jul 24",
    playbook: {
      id: "20",
      title: "Engineering Playbook 2023",
      user: "Nick Kramarenko",
      image: second_icon,
      page: "Page 4",
    },
  },
  {
    id: "3",
    tag: "Launch Product",
    name: "Foster a culture of innovation and employee empowerment",
    description:
      "Identify and establish partnerships with complementary businesses or influential industry players to leverage their networks, resources, and expertise, thereby expanding market reach and gaining a competitive edge.",
    status: "Success",
    due_date: "Due Jul 24",
    playbook: {
      id: "30",
      title: "Early Stage Product Playbook early stage Product Product Play..",
      user: "Nick Kramarenko",
      image: third_icon,
      page: "Page 4",
    },
  },
  {
    id: "4",
    tag: "Launch Product",
    name: "Expand market presence through strategic partnerships",
    description:
      "Identify and establish partnerships with complementary businesses or influential industry players to leverage their networks, resources, and expertise, thereby expanding market reach and gaining a competitive edge.",
    status: "Failed",
    due_date: "Due Jul 24",
    //     playbook: {
    //       id: "40",
    //       title: "Engineering Playbook 2023",
    //       user: "Nick Kramarenko",
    //       image: first_icon,
    //       page: "Page 4",
    //     },
  },
  {
    id: "5",
    tag: "Launch Product",
    name: "Foster a culture of innovation and employee empowerment",
    description:
      "Identify and establish partnerships with complementary businesses or influential industry players to leverage their networks, resources, and expertise, thereby expanding market reach and gaining a competitive edge.",
    status: "Success",
    due_date: "Due Jul 24",
    playbook: {
      id: "50",
      title: "Getting Started: Your First Playbook Playbook Playbook.....",
      user: "Nick Kramarenko",
      image: fourth_icon,
      page: "Page 4",
    },
  },
  {
    id: "6",
    tag: "Launch Product",
    name: "Expand market presence through strategic partnerships",
    description:
      "Identify and establish partnerships with complementary businesses or influential industry players to leverage their networks, resources, and expertise, thereby expanding market reach and gaining a competitive edge.",
    status: "Open",
    due_date: "Due Jul 24",
    //     playbook: {
    //       id: "60",
    //       title: "Engineering Playbook 2023",
    //       user: "Nick Kramarenko",
    //       image: first_icon,
    //       page: "Page 4",
    //     },
  },
];
