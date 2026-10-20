// Visitor counting, via GoatCounter. No cookies, no personal data, nothing that
// needs a consent banner — which matters on a site that argues about this sort
// of thing for a living.
//
// SETUP: put your GoatCounter code below — just the first part of the
// subdomain, so for https://aakash.goatcounter.com the code is "aakash".
// While this is empty, nothing is loaded and nothing is counted.
const GOATCOUNTER_CODE = "";

(() => {
  if (!GOATCOUNTER_CODE) return;

  // Don't count visits while working on the site locally.
  const local = ["localhost", "127.0.0.1", "[::1]", ""].includes(location.hostname)
    || location.hostname.endsWith(".localhost")
    || location.protocol === "file:";
  if (local) return;

  // Respect a browser that asks not to be tracked. GoatCounter collects nothing
  // personal either way, but honouring the signal costs nothing.
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  document.head.appendChild(s);
})();
