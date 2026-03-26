function waitForGame() {
    if (!window.UnityWebModkit || !window.unityGameInstance) {
        console.log("Waiting for Unity...");
        setTimeout(waitForGame, 1000);
        return;
    }

    console.log("Unity + Modkit Ready");

    window.ctx = window.UnityWebModkit.Runtime.createPlugin({
        name: 'TestGraphics',
        version: '1.0',
        referencedAssemblies: [
            'GameAssembly.dll',
            'UnityEngine.CoreModule.dll'
        ]
    });

    startLoop();
}

function startLoop() {
    function loop() {
        try {
            // 🥔 POTATO MODE (very obvious change)
            ctx.call("UnityEngine.QualitySettings", "set_globalTextureMipmapLimit", [14]);
            ctx.call("UnityEngine.QualitySettings", "set_shadowDistance", [0]);
            ctx.call("UnityEngine.QualitySettings", "set_antiAliasing", [0]);

        } catch (e) {
            console.log("Error:", e);
        }

        requestAnimationFrame(loop);
    }

    loop();
}

waitForGame();
