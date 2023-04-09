//comment schema
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
}
