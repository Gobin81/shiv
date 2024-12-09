// Disable Print Screen Key
document.addEventListener("keydown", function (e) {
    if (e.key === "PrintScreen") {
        alert("Screenshots are not allowed on this site.");
        e.preventDefault();
    }
});

// Prevent Screenshot on Windows (Snipping Tool) with Clipboard
document.addEventListener("keyup", function (e) {
    if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("").then(() => {
            alert("Screenshots are not allowed on this site.");
        });
    }
});

// Detect Screenshots on Mobile (Screenshot Event Simulation)
let lastActivityTime = Date.now();

document.addEventListener("visibilitychange", function () {
    const now = Date.now();
    if (document.hidden && now - lastActivityTime < 2000) {
        alert("Screenshots are not allowed on this site.");
    }
    lastActivityTime = now;
});

// Prevent Screen Recording (Blur Content on Developer Tools Open)
const blurContent = () => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.8)";
    overlay.style.zIndex = "9999";
    overlay.style.color = "white";
    overlay.style.fontSize = "20px";
    overlay.style.textAlign = "center";
    overlay.style.lineHeight = "100vh";
    overlay.textContent = "Screenshots and screen recording are not allowed.";
    document.body.appendChild(overlay);
};

// Detect Developer Tools Opening
let devToolsOpen = false;

const detectDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            blurContent();
        }
    } else {
        devToolsOpen = false;
    }
};

setInterval(detectDevTools, 1000);
