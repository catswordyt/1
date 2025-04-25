(async function(){
  const canvas = document.getElementById('lwjgl');

  // 1) Initialize CheerpJ
  await cheerpjInit({
    wasmPath: 'cheerpj/4.5/cheerpj.wasm',
    javaProperties: [
      // tell JVM where the native stubs live
      'java.library.path=cheerpj-natives/natives'
    ]
  });

  // 2) Create an LWJGL display bound to our canvas
  cheerpjCreateDisplay(canvas.width, canvas.height);

  // 3) Fetch latest release metadata
  const manifest = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(r=>r.json());
  const latestId = manifest.latest.release;
  const info = manifest.versions.find(v=>v.id===latestId);
  const versionInfo = await fetch(info.url).then(r=>r.json());

  // 4) Launch official Minecraft client
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
