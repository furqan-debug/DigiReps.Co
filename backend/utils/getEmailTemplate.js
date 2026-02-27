const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function getEmailHtml(templateName) {
  const res = await client.getEntries({
    content_type: 'emailTemplate',
    'fields.templateName': templateName,
    limit: 1,
  });

  const item = res.items[0];

//   console.log('Returned fields:', item.fields);

  if (!item.fields.htmlContent) {
    throw new Error(`"htmlContent" field not found on emailTemplate "${templateName}". Found fields: ${Object.keys(item.fields).join(', ')}`);
  }

  return item.fields.htmlContent;
}


module.exports = { getEmailHtml };
