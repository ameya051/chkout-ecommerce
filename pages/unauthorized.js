import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/layout/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized">
      <div>
        <h1 className="text-xl">Access denied...</h1>
        {message && <div className="mb-4 text-red-500">{message}</div>}
      </div>
    </Layout>
  );
}
