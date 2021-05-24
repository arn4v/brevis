import { GetServerSideProps } from "next";
import redis from "../lib/redis";

export default function RedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  params,
  res,
}) => {
  const id = params?.id as string;
  if (id) {
    try {
      const url = await redis.get(id);
      if (url) {
        res.statusCode = 302;
        res.setHeader("Location", url);
        res.end();
      } else {
        return {
          props: {},
          notFound: true,
        };
      }
    } catch {
      res.statusCode = 500;
      res.statusMessage = "Unable to get key from redis.";
      res.end();
      return { notFound: true };
    }
  } else {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {},
    notFound: true,
  };
};
