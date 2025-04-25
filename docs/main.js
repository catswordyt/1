(async function(){
  const canvas = document.getElementById('lwjgl');

  // Initialize CheerpJ (hot-linking both JS loader and WASM)
  await cheerpjInit({
    wasmPath: 'https://storage.googleapis.com/cheerpj/4.5/cheerpj.wasm',
    javaProperties: ['java.library.path=cheerpj-natives/natives']
  });

  // Bind LWJGL to our canvas
  cheerpjCreateDisplay(canvas.width, canvas.height);

  // Fetch “latest” Minecraft client JAR URL
  const manifest = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(r=>r.json());
  const latestId = manifest.latest.release;
  const info = manifest.versions.find(v=>v.id===latestId);
  const versionInfo = await fetch(info.url).then(r=>r.json());

  // Launch Minecraft
  cheerpjRun({
    jar: versionInfo.downloads.client.url,
    mainClass: 'net.minecraft.client.Main',
    args: [
      '--gameDir','/usergame',
      '--version',versionInfo.id,
      '--width', canvas.width,
      '--height',canvas.height,
      '--accessToken','00000000-0000-0000-0000-000000000000'
    ]
  });
})();
