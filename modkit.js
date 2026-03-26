(function () {
    if (window.UnityWebModkit) return;

    console.log("[MyModkit] Loading...");

    window.UnityWebModkit = {
        Runtime: {
            createPlugin(config) {
                console.log("[MyModkit] Plugin:", config.name);

                return {
                    config,

                    call(assembly, method, args = []) {
                        try {
                            const unity = window.unityInstance || window.unityGameInstance;

                            if (!unity) {
                                console.warn("[MyModkit] Unity not ready");
                                return { val: () => 0 };
                            }

                            console.log(`[CALL] ${assembly}.${method}`, args);

                            return {
                                val: () => 0
                            };

                        } catch (e) {
                            console.error("[MyModkit ERROR]", e);
                            return { val: () => 0 };
                        }
                    },

                    // 🔥 Custom functions
                    setTexture(value) {
                        this.call("UnityEngine.QualitySettings", "set_globalTextureMipmapLimit", [value]);
                    },

                    setShadows(value) {
                        this.call("UnityEngine.QualitySettings", "set_shadowDistance", [value]);
                    },

                    setAA(value) {
                        this.call("UnityEngine.QualitySettings", "set_antiAliasing", [value]);
                    }
                };
            }
        }
    };

    console.log("[MyModkit] Loaded");
})();
