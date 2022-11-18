import React from "react";

import { User } from "@/lib/models";

export const UserContext = React.createContext<User | undefined>(undefined);
