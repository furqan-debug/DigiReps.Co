const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function getAdminCredentials() {
  const entries = await client.getEntries({
    content_type: 'adminCredentials', // Replace with your actual content type ID
    limit: 1,
  });

  if (!entries.items.length) throw new Error("No admin credentials found");

  const fields = entries.items[0].fields;
  return {
    password: fields.password,
  };
}

module.exports = getAdminCredentials;
