// vite.config.ts
import react from "@vitejs/plugin-react";
import path3, { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/manifest-parser/index.ts
var ManifestParser = class {
  constructor() {
  }
  static convertManifestToString(manifest2) {
    return JSON.stringify(manifest2, null, 2);
  }
};
var manifest_parser_default = ManifestParser;

// utils/plugins/make-manifest.ts
var { resolve } = path;
var outDir = resolve("C:\\Users\\\u0627\u0644\u0637\u0627\u0644\u0628\\Desktop\\ammar\\learn-chrome-extnesion\\utils\\plugins", "..", "..", "public");
function makeManifest(manifest2) {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(
        manifestPath,
        manifest_parser_default.convertManifestToString(manifest2)
      );
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/custom-dynamic-import.ts
function customDynamicImport() {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}"
      };
    }
  };
}

// utils/plugins/add-hmr.ts
import * as path2 from "path";
import { readFileSync } from "fs";
var isDev = process.env.__DEV__ === "true";
var DUMMY_CODE = `export default function(){};`;
function getInjectionCode(fileName) {
  return readFileSync(
    path2.resolve("C:\\Users\\\u0627\u0644\u0637\u0627\u0644\u0628\\Desktop\\ammar\\learn-chrome-extnesion\\utils\\plugins", "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}
function addHmr(config) {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";
  const scriptHmrCode = isDev ? getInjectionCode("script.js") : DUMMY_CODE;
  const viewHmrCode = isDev ? getInjectionCode("view.js") : DUMMY_CODE;
  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript || id === idInView) {
        return getResolvedId(id);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }
      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    }
  };
}
function getResolvedId(id) {
  return "\0" + id;
}

// package.json
var package_default = {
  name: "chrome-extension-boilerplate-react-vite",
  version: "0.0.1",
  description: "chrome extension boilerplate",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite.git"
  },
  scripts: {
    build: "tsc --noEmit && vite build",
    "build:watch": "vite build --watch",
    "build:hmr": "rollup --config utils/reload/rollup.config.ts",
    wss: "node utils/reload/initReloadServer.js",
    dev: "npm run build:hmr && (run-p wss build:watch)",
    test: "jest"
  },
  type: "module",
  dependencies: {
    react: "^17.0.2",
    "react-dom": "^17.0.2"
  },
  devDependencies: {
    "@rollup/plugin-typescript": "^8.5.0",
    "@testing-library/react": "13.4.0",
    "@types/chrome": "0.0.197",
    "@types/jest": "29.0.3",
    "@types/node": "18.7.23",
    "@types/react": "^17.0.33",
    "@types/react-dom": "^17.0.10",
    "@types/ws": "^8.5.3",
    "@typescript-eslint/eslint-plugin": "5.38.1",
    "@typescript-eslint/parser": "5.38.1",
    "@vitejs/plugin-react": "^1.0.7",
    chokidar: "^3.5.3",
    eslint: "8.24.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-react": "7.31.8",
    "fs-extra": "10.1.0",
    jest: "29.0.3",
    "jest-environment-jsdom": "29.0.3",
    "npm-run-all": "^4.1.5",
    prettier: "2.7.1",
    rollup: "2.79.1",
    sass: "1.55.0",
    "ts-jest": "29.0.2",
    "ts-loader": "9.4.1",
    typescript: "^4.5.4",
    vite: "^2.8.0",
    ws: "8.9.0"
  }
};

// manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.js" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle.chunk.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-34.png"
      ],
      matches: ["*://*/*"]
    }
  ]
};
var manifest_default = manifest;

// vite.config.ts
import { defineConfig } from "vite";
var root = resolve3("C:\\Users\\\u0627\u0644\u0637\u0627\u0644\u0628\\Desktop\\ammar\\learn-chrome-extnesion", "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir2 = resolve3("C:\\Users\\\u0627\u0644\u0637\u0627\u0644\u0628\\Desktop\\ammar\\learn-chrome-extnesion", "dist");
var publicDir = resolve3("C:\\Users\\\u0627\u0644\u0637\u0627\u0644\u0628\\Desktop\\ammar\\learn-chrome-extnesion", "public");
var isDev2 = process.env.__DEV__ === "true";
var isProduction = !isDev2;
var enableHmrInBackgroundScript = true;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    makeManifest(manifest_default),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true })
  ],
  publicDir,
  build: {
    outDir: outDir2,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        contentStyle: resolve3(pagesDir, "content", "style.scss"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      watch: {
        include: ["src/**", "vite.config.ts"],
        exclude: ["node_modules/**", "src/**/*.spec.ts"]
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev2 ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path3.parse(assetInfo.name);
          const assetFolder = dir.split("/").at(-1);
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        }
      }
    }
  }
});
function firstUpperCase(str) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgbWFrZU1hbmlmZXN0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdFwiO1xyXG5pbXBvcnQgY3VzdG9tRHluYW1pY0ltcG9ydCBmcm9tIFwiLi91dGlscy9wbHVnaW5zL2N1c3RvbS1keW5hbWljLWltcG9ydFwiO1xyXG5pbXBvcnQgYWRkSG1yIGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvYWRkLWhtclwiO1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3RcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuXHJcbmNvbnN0IHJvb3QgPSByZXNvbHZlKFwiQzpcXFxcVXNlcnNcXFxcXHUwNjI3XHUwNjQ0XHUwNjM3XHUwNjI3XHUwNjQ0XHUwNjI4XFxcXERlc2t0b3BcXFxcYW1tYXJcXFxcbGVhcm4tY2hyb21lLWV4dG5lc2lvblwiLCBcInNyY1wiKTtcclxuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XHJcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoXCJDOlxcXFxVc2Vyc1xcXFxcdTA2MjdcdTA2NDRcdTA2MzdcdTA2MjdcdTA2NDRcdTA2MjhcXFxcRGVza3RvcFxcXFxhbW1hclxcXFxsZWFybi1jaHJvbWUtZXh0bmVzaW9uXCIsIFwiZGlzdFwiKTtcclxuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXFx1MDYyN1x1MDY0NFx1MDYzN1x1MDYyN1x1MDY0NFx1MDYyOFxcXFxEZXNrdG9wXFxcXGFtbWFyXFxcXGxlYXJuLWNocm9tZS1leHRuZXNpb25cIiwgXCJwdWJsaWNcIik7XHJcblxyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xyXG5jb25zdCBpc1Byb2R1Y3Rpb24gPSAhaXNEZXY7XHJcblxyXG4vLyBFTkFCTEUgSE1SIElOIEJBQ0tHUk9VTkQgU0NSSVBUXHJcbmNvbnN0IGVuYWJsZUhtckluQmFja2dyb3VuZFNjcmlwdCA9IHRydWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQHNyY1wiOiByb290LFxyXG4gICAgICBcIkBhc3NldHNcIjogYXNzZXRzRGlyLFxyXG4gICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpcixcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbWFrZU1hbmlmZXN0KG1hbmlmZXN0KSxcclxuICAgIGN1c3RvbUR5bmFtaWNJbXBvcnQoKSxcclxuICAgIGFkZEhtcih7IGJhY2tncm91bmQ6IGVuYWJsZUhtckluQmFja2dyb3VuZFNjcmlwdCwgdmlldzogdHJ1ZSB9KSxcclxuICBdLFxyXG4gIHB1YmxpY0RpcixcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyLFxyXG4gICAgLyoqIENhbiBzbG93RG93biBidWlsZCBzcGVlZC4gKi9cclxuICAgIC8vIHNvdXJjZW1hcDogaXNEZXYsXHJcbiAgICBtaW5pZnk6IGlzUHJvZHVjdGlvbixcclxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBpc1Byb2R1Y3Rpb24sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgZGV2dG9vbHM6IHJlc29sdmUocGFnZXNEaXIsIFwiZGV2dG9vbHNcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIHBhbmVsOiByZXNvbHZlKHBhZ2VzRGlyLCBcInBhbmVsXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c1wiKSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiByZXNvbHZlKHBhZ2VzRGlyLCBcImJhY2tncm91bmRcIiwgXCJpbmRleC50c1wiKSxcclxuICAgICAgICBjb250ZW50U3R5bGU6IHJlc29sdmUocGFnZXNEaXIsIFwiY29udGVudFwiLCBcInN0eWxlLnNjc3NcIiksXHJcbiAgICAgICAgcG9wdXA6IHJlc29sdmUocGFnZXNEaXIsIFwicG9wdXBcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIG5ld3RhYjogcmVzb2x2ZShwYWdlc0RpciwgXCJuZXd0YWJcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIG9wdGlvbnM6IHJlc29sdmUocGFnZXNEaXIsIFwib3B0aW9uc1wiLCBcImluZGV4Lmh0bWxcIiksXHJcbiAgICAgIH0sXHJcbiAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgaW5jbHVkZTogW1wic3JjLyoqXCIsIFwidml0ZS5jb25maWcudHNcIl0sXHJcbiAgICAgICAgZXhjbHVkZTogW1wibm9kZV9tb2R1bGVzLyoqXCIsIFwic3JjLyoqLyouc3BlYy50c1wiXSxcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3JjL3BhZ2VzL1tuYW1lXS9pbmRleC5qc1wiLFxyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBpc0RldlxyXG4gICAgICAgICAgPyBcImFzc2V0cy9qcy9bbmFtZV0uanNcIlxyXG4gICAgICAgICAgOiBcImFzc2V0cy9qcy9bbmFtZV0uW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZGlyLCBuYW1lOiBfbmFtZSB9ID0gcGF0aC5wYXJzZShhc3NldEluZm8ubmFtZSk7XHJcbiAgICAgICAgICBjb25zdCBhc3NldEZvbGRlciA9IGRpci5zcGxpdChcIi9cIikuYXQoLTEpO1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGFzc2V0Rm9sZGVyICsgZmlyc3RVcHBlckNhc2UoX25hbWUpO1xyXG4gICAgICAgICAgcmV0dXJuIGBhc3NldHMvW2V4dF0vJHtuYW1lfS5jaHVuay5bZXh0XWA7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5mdW5jdGlvbiBmaXJzdFVwcGVyQ2FzZShzdHI6IHN0cmluZykge1xyXG4gIGNvbnN0IGZpcnN0QWxwaGFiZXQgPSBuZXcgUmVnRXhwKC8oIHxeKVthLXpdLywgXCJnXCIpO1xyXG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKGZpcnN0QWxwaGFiZXQsIChMKSA9PiBMLnRvVXBwZXJDYXNlKCkpO1xyXG59XHJcbiIsICJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgY29sb3JMb2cgZnJvbSBcIi4uL2xvZ1wiO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgTWFuaWZlc3RQYXJzZXIgZnJvbSBcIi4uL21hbmlmZXN0LXBhcnNlclwiO1xyXG5cclxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xyXG5cclxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXFx1MDYyN1x1MDY0NFx1MDYzN1x1MDYyN1x1MDY0NFx1MDYyOFxcXFxEZXNrdG9wXFxcXGFtbWFyXFxcXGxlYXJuLWNocm9tZS1leHRuZXNpb25cXFxcdXRpbHNcXFxccGx1Z2luc1wiLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlTWFuaWZlc3QoXHJcbiAgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjNcclxuKTogUGx1Z2luT3B0aW9uIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogXCJtYWtlLW1hbmlmZXN0XCIsXHJcbiAgICBidWlsZEVuZCgpIHtcclxuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcclxuICAgICAgICBmcy5ta2RpclN5bmMob3V0RGlyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWFuaWZlc3RQYXRoID0gcmVzb2x2ZShvdXREaXIsIFwibWFuaWZlc3QuanNvblwiKTtcclxuXHJcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoXHJcbiAgICAgICAgbWFuaWZlc3RQYXRoLFxyXG4gICAgICAgIE1hbmlmZXN0UGFyc2VyLmNvbnZlcnRNYW5pZmVzdFRvU3RyaW5nKG1hbmlmZXN0KVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgXCJzdWNjZXNzXCIpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiIsICJ0eXBlIENvbG9yVHlwZSA9IFwic3VjY2Vzc1wiIHwgXCJpbmZvXCIgfCBcImVycm9yXCIgfCBcIndhcm5pbmdcIiB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvckxvZyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBDb2xvclR5cGUpIHtcclxuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XHJcblxyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdHcmVlbjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaW5mb1wiOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImVycm9yXCI6XHJcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnUmVkO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJ3YXJuaW5nXCI6XHJcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnWWVsbG93O1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcclxufVxyXG5cclxuY29uc3QgQ09MT1JTID0ge1xyXG4gIFJlc2V0OiBcIlxceDFiWzBtXCIsXHJcbiAgQnJpZ2h0OiBcIlxceDFiWzFtXCIsXHJcbiAgRGltOiBcIlxceDFiWzJtXCIsXHJcbiAgVW5kZXJzY29yZTogXCJcXHgxYls0bVwiLFxyXG4gIEJsaW5rOiBcIlxceDFiWzVtXCIsXHJcbiAgUmV2ZXJzZTogXCJcXHgxYls3bVwiLFxyXG4gIEhpZGRlbjogXCJcXHgxYls4bVwiLFxyXG4gIEZnQmxhY2s6IFwiXFx4MWJbMzBtXCIsXHJcbiAgRmdSZWQ6IFwiXFx4MWJbMzFtXCIsXHJcbiAgRmdHcmVlbjogXCJcXHgxYlszMm1cIixcclxuICBGZ1llbGxvdzogXCJcXHgxYlszM21cIixcclxuICBGZ0JsdWU6IFwiXFx4MWJbMzRtXCIsXHJcbiAgRmdNYWdlbnRhOiBcIlxceDFiWzM1bVwiLFxyXG4gIEZnQ3lhbjogXCJcXHgxYlszNm1cIixcclxuICBGZ1doaXRlOiBcIlxceDFiWzM3bVwiLFxyXG4gIEJnQmxhY2s6IFwiXFx4MWJbNDBtXCIsXHJcbiAgQmdSZWQ6IFwiXFx4MWJbNDFtXCIsXHJcbiAgQmdHcmVlbjogXCJcXHgxYls0Mm1cIixcclxuICBCZ1llbGxvdzogXCJcXHgxYls0M21cIixcclxuICBCZ0JsdWU6IFwiXFx4MWJbNDRtXCIsXHJcbiAgQmdNYWdlbnRhOiBcIlxceDFiWzQ1bVwiLFxyXG4gIEJnQ3lhbjogXCJcXHgxYls0Nm1cIixcclxuICBCZ1doaXRlOiBcIlxceDFiWzQ3bVwiLFxyXG59IGFzIGNvbnN0O1xyXG4iLCAidHlwZSBNYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjM7XHJcblxyXG5jbGFzcyBNYW5pZmVzdFBhcnNlciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzdGF0aWMgY29udmVydE1hbmlmZXN0VG9TdHJpbmcobWFuaWZlc3Q6IE1hbmlmZXN0KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5pZmVzdFBhcnNlcjtcclxuIiwgImltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjdXN0b21EeW5hbWljSW1wb3J0KCk6IFBsdWdpbk9wdGlvbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IFwiY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCIsXHJcbiAgICByZW5kZXJEeW5hbWljSW1wb3J0KCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxlZnQ6IGBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb25zdCBkeW5hbWljSW1wb3J0ID0gKHBhdGgpID0+IGltcG9ydChwYXRoKTtcclxuICAgICAgICAgIGR5bmFtaWNJbXBvcnQoXHJcbiAgICAgICAgICBgLFxyXG4gICAgICAgIHJpZ2h0OiBcIil9XCIsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIiwgImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XHJcblxyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xyXG5cclxuY29uc3QgRFVNTVlfQ09ERSA9IGBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpe307YDtcclxuXHJcbmZ1bmN0aW9uIGdldEluamVjdGlvbkNvZGUoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHJlYWRGaWxlU3luYyhcclxuICAgIHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXFx1MDYyN1x1MDY0NFx1MDYzN1x1MDYyN1x1MDY0NFx1MDYyOFxcXFxEZXNrdG9wXFxcXGFtbWFyXFxcXGxlYXJuLWNocm9tZS1leHRuZXNpb25cXFxcdXRpbHNcXFxccGx1Z2luc1wiLCBcIi4uXCIsIFwicmVsb2FkXCIsIFwiaW5qZWN0aW9uc1wiLCBmaWxlTmFtZSksXHJcbiAgICB7IGVuY29kaW5nOiBcInV0ZjhcIiB9XHJcbiAgKTtcclxufVxyXG5cclxudHlwZSBDb25maWcgPSB7XHJcbiAgYmFja2dyb3VuZD86IGJvb2xlYW47XHJcbiAgdmlldz86IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRIbXIoY29uZmlnPzogQ29uZmlnKTogUGx1Z2luT3B0aW9uIHtcclxuICBjb25zdCB7IGJhY2tncm91bmQgPSBmYWxzZSwgdmlldyA9IHRydWUgfSA9IGNvbmZpZyB8fCB7fTtcclxuICBjb25zdCBpZEluQmFja2dyb3VuZFNjcmlwdCA9IFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLWJhY2tncm91bmQtc2NyaXB0XCI7XHJcbiAgY29uc3QgaWRJblZpZXcgPSBcInZpcnR1YWw6cmVsb2FkLW9uLXVwZGF0ZS1pbi12aWV3XCI7XHJcblxyXG4gIGNvbnN0IHNjcmlwdEhtckNvZGUgPSBpc0RldiA/IGdldEluamVjdGlvbkNvZGUoXCJzY3JpcHQuanNcIikgOiBEVU1NWV9DT0RFO1xyXG4gIGNvbnN0IHZpZXdIbXJDb2RlID0gaXNEZXYgPyBnZXRJbmplY3Rpb25Db2RlKFwidmlldy5qc1wiKSA6IERVTU1ZX0NPREU7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcImFkZC1obXJcIixcclxuICAgIHJlc29sdmVJZChpZCkge1xyXG4gICAgICBpZiAoaWQgPT09IGlkSW5CYWNrZ3JvdW5kU2NyaXB0IHx8IGlkID09PSBpZEluVmlldykge1xyXG4gICAgICAgIHJldHVybiBnZXRSZXNvbHZlZElkKGlkKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxvYWQoaWQpIHtcclxuICAgICAgaWYgKGlkID09PSBnZXRSZXNvbHZlZElkKGlkSW5CYWNrZ3JvdW5kU2NyaXB0KSkge1xyXG4gICAgICAgIHJldHVybiBiYWNrZ3JvdW5kID8gc2NyaXB0SG1yQ29kZSA6IERVTU1ZX0NPREU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpZCA9PT0gZ2V0UmVzb2x2ZWRJZChpZEluVmlldykpIHtcclxuICAgICAgICByZXR1cm4gdmlldyA/IHZpZXdIbXJDb2RlIDogRFVNTVlfQ09ERTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSZXNvbHZlZElkKGlkOiBzdHJpbmcpIHtcclxuICByZXR1cm4gXCJcXDBcIiArIGlkO1xyXG59XHJcbiIsICJpbXBvcnQgcGFja2FnZUpzb24gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XHJcblxyXG4vKipcclxuICogQWZ0ZXIgY2hhbmdpbmcsIHBsZWFzZSByZWxvYWQgdGhlIGV4dGVuc2lvbiBhdCBgY2hyb21lOi8vZXh0ZW5zaW9uc2BcclxuICovXHJcbmNvbnN0IG1hbmlmZXN0OiBjaHJvbWUucnVudGltZS5NYW5pZmVzdFYzID0ge1xyXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcbiAgbmFtZTogcGFja2FnZUpzb24ubmFtZSxcclxuICB2ZXJzaW9uOiBwYWNrYWdlSnNvbi52ZXJzaW9uLFxyXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcclxuICBvcHRpb25zX3BhZ2U6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiLFxyXG4gIGJhY2tncm91bmQ6IHsgc2VydmljZV93b3JrZXI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXguanNcIiB9LFxyXG4gIGFjdGlvbjoge1xyXG4gICAgZGVmYXVsdF9wb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxyXG4gICAgZGVmYXVsdF9pY29uOiBcImljb24tMzQucG5nXCIsXHJcbiAgfSxcclxuICBjaHJvbWVfdXJsX292ZXJyaWRlczoge1xyXG4gICAgbmV3dGFiOiBcInNyYy9wYWdlcy9uZXd0YWIvaW5kZXguaHRtbFwiLFxyXG4gIH0sXHJcbiAgaWNvbnM6IHtcclxuICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCIsXHJcbiAgfSxcclxuICBjb250ZW50X3NjcmlwdHM6IFtcclxuICAgIHtcclxuICAgICAgbWF0Y2hlczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcclxuICAgICAganM6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzXCJdLFxyXG4gICAgICBjc3M6IFtcImFzc2V0cy9jc3MvY29udGVudFN0eWxlLmNodW5rLmNzc1wiXSxcclxuICAgIH0sXHJcbiAgXSxcclxuICBkZXZ0b29sc19wYWdlOiBcInNyYy9wYWdlcy9kZXZ0b29scy9pbmRleC5odG1sXCIsXHJcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXHJcbiAgICB7XHJcbiAgICAgIHJlc291cmNlczogW1xyXG4gICAgICAgIFwiYXNzZXRzL2pzLyouanNcIixcclxuICAgICAgICBcImFzc2V0cy9jc3MvKi5jc3NcIixcclxuICAgICAgICBcImljb24tMTI4LnBuZ1wiLFxyXG4gICAgICAgIFwiaWNvbi0zNC5wbmdcIixcclxuICAgICAgXSxcclxuICAgICAgbWF0Y2hlczogW1wiKjovLyovKlwiXSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxXQUFXO0FBQ2xCLE9BQU9BLFNBQVEsV0FBQUMsZ0JBQWU7OztBQ0Q5QixZQUFZLFFBQVE7QUFDcEIsWUFBWSxVQUFVOzs7QUNDUCxTQUFSLFNBQTBCLFNBQWlCLE1BQWtCO0FBQ2xFLE1BQUksUUFBZ0IsUUFBUSxPQUFPO0FBRW5DLFVBQVE7QUFBQSxTQUNEO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxTQUNHO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxTQUNHO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxTQUNHO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQTtBQUdKLFVBQVEsSUFBSSxPQUFPLE9BQU87QUFDNUI7QUFFQSxJQUFNLFNBQVM7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLEtBQUs7QUFBQSxFQUNMLFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFDWDs7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QUFVLFNBQVMsWUFBWTtBQUFBLFFBQzlDLFNBQVNBLFNBQVEsVUFBVSxXQUFXLFVBQVU7QUFBQSxRQUNoRCxZQUFZQSxTQUFRLFVBQVUsY0FBYyxVQUFVO0FBQUEsUUFDdEQsY0FBY0EsU0FBUSxVQUFVLFdBQVcsWUFBWTtBQUFBLFFBQ3ZELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxRQUFRQSxTQUFRLFVBQVUsVUFBVSxZQUFZO0FBQUEsUUFDaEQsU0FBU0EsU0FBUSxVQUFVLFdBQVcsWUFBWTtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsVUFBVSxnQkFBZ0I7QUFBQSxRQUNwQyxTQUFTLENBQUMsbUJBQW1CLGtCQUFrQjtBQUFBLE1BQ2pEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0JFLFNBQ1osd0JBQ0E7QUFBQSxRQUNKLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsZ0JBQU0sRUFBRSxLQUFLLE1BQU0sTUFBTSxJQUFJQyxNQUFLLE1BQU0sVUFBVSxJQUFJO0FBQ3RELGdCQUFNLGNBQWMsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEMsZ0JBQU0sT0FBTyxjQUFjLGVBQWUsS0FBSztBQUMvQyxpQkFBTyxnQkFBZ0I7QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFFRCxTQUFTLGVBQWUsS0FBYTtBQUNuQyxRQUFNLGdCQUFnQixJQUFJLE9BQU8sY0FBYyxHQUFHO0FBQ2xELFNBQU8sSUFBSSxZQUFZLEVBQUUsUUFBUSxlQUFlLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQztBQUN4RTsiLAogICJuYW1lcyI6IFsicGF0aCIsICJyZXNvbHZlIiwgIm1hbmlmZXN0IiwgIm1hbmlmZXN0IiwgInBhdGgiLCAicmVzb2x2ZSIsICJvdXREaXIiLCAiaXNEZXYiLCAicGF0aCJdCn0K
