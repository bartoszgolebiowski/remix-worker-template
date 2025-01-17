import * as esbuild from 'esbuild';

async function build() {
  // eslint-disable-next-line no-undef
  const mode = process.env.NODE_ENV?.toLowerCase() ?? 'development';

  console.log(`Building Worker in ${mode} mode`);

  const outfile = './dist/worker.mjs';
  const startTime = Date.now();
  const result = await esbuild.build({
    entryPoints: ['./worker/index.ts'],
    bundle: true,
    minify: mode === 'production',
    sourcemap: mode !== 'production',
    format: 'esm',
    metafile: true,
    external: ['__STATIC_CONTENT_MANIFEST'],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
      'process.env.REMIX_DEV_SERVER_WS_PORT': `"8002"`,
    },
    outfile,
  });
  const endTime = Date.now();

  console.log(`Built in ${endTime - startTime}ms`);

  if (mode === 'production') {
    console.log(await esbuild.analyzeMetafile(result.metafile));
  }
}

build().catch((e) => console.error('Unknown error caught during build: ', e));
