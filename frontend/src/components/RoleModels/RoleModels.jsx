import React, { useState } from "react";
import "../../styles/CreateProject.css";
import SelectRoleModel from "../ProjectPage/SelectRoleModel";

function RoleModels() {
  return (
    <div className="cp-rolemodel-container">
      <SelectRoleModel canAdd={false} />
    </div>
  );
}

export default RoleModels;
