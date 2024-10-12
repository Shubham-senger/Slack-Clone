import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import {Password} from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server";

import {DataModel} from "./_generated/dataModel";

//this thing is neccesary so that our name field will not be empty in convex
const CustomPassword = Password<DataModel>({
  profile(params){
    return {
      email:params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword,Password,GitHub,Google],
});
