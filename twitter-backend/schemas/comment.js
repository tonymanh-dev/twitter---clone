export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
    },

    {
      name: 'tweet',
      title: 'Tweet',
      description: 'Reference the tweet the comment is associated to:',
      type: 'reference',
      to: {
        type: 'tweet',
      },
    },
  ],
}
