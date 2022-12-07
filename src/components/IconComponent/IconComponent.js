import React from "react";
import {
  SiSonarqube,
  SiJenkins,
  SiSubversion,
  SiVirtualbox,
} from "react-icons/si";

import { GrApps } from "react-icons/gr";

export default function IconComponent({ icon }) {

  const getIcon = () => {
    switch (icon) {
      case "sonar":
        return <SiSonarqube></SiSonarqube>;
      case "svn":
        return <SiSubversion></SiSubversion>;
      case "jenkins":
        return <SiJenkins></SiJenkins>;
      case "citrix":
        return <SiVirtualbox></SiVirtualbox>;
      default:
        return <GrApps></GrApps>
    }
  };

  return (
    <>
    {getIcon()}
    </>
  )
}
