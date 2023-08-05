import React from "react";

import { CommonInfo } from "@/lib/models";

export const CommonInfoContext = React.createContext<CommonInfo | undefined>(
  undefined
);
