function makeSlug(title) {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric characters except -
    .replace(/--+/g, "-") // Replace multiple - with a single -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}

export default makeSlug;
