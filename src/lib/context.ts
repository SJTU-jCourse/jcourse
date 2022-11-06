import React from "react";
import { User } from "./models";

export const UserContext = React.createContext<User | undefined>(undefined);
