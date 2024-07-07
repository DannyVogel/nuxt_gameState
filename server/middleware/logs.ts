export default defineEventHandler(async (event) => {
  // /_ipx/
  if (!event.path.includes("/_ipx/")) console.log("request path", event.path);
});
