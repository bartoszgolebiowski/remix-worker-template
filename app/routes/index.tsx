import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import initSqlJs from 'sql.js';

export let meta: MetaFunction = () => {
  return {
    title: 'remix-worker-template',
    description: 'All-in-one remix starter template for Cloudflare Workers',
  };
};

export let links: LinksFunction = () => {
  return [];
};

export const loader = async () => {
  const buffer = await fetch(
    'https://pub-a6fa47933ebb4d7a87a1c7e68ab36da0.r2.dev/flaschard'
  ).then((res) => res.arrayBuffer());

  const SQL = await initSqlJs();
  const db = new SQL.Database(new Uint8Array(buffer));
  const res = db.exec('SELECT * FROM tbl1');
  console.log(res);
  return json(JSON.stringify(res));
};

export default function Index() {
  let res = useLoaderData();

  return (
    <div>
      <div className="sm:px-10 p-5">
        <h2 className="mt-6 text-xl">{JSON.stringify(res)}</h2>
        <p className="py-2">
          All-in-one remix starter template for Cloudflare Workers
        </p>

        <a
          className="inline-block border hover:border-black px-4 py-2 mt-2"
          href="https://github.com/edmundhung/remix-worker-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Repository
        </a>
      </div>
    </div>
  );
}
