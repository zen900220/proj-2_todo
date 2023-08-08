import ResetPassword from "@/components/ResetPassword/ResetPassword";
import React from "react";

const page = ({ params }) => {
  return <ResetPassword token={params.token} />;
};

export default page;
