export async function useSubscribeToNewsletter(email: string) {
  await $fetch('https://a.klaviyo.com/client/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'revision': '2025-07-15',
    },
    query: {
      company_id: 'VQJume',
    },
    body: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: {
          profile: {
            data: {
              type: 'profile',
              attributes: {
                subscriptions: {
                  email: {
                    marketing: {
                      consent: 'SUBSCRIBED',
                    },
                  },
                },
                email,
              },
            },
          },
        },
        relationships: {
          list: {
            data: {
              type: 'list',
              id: 'TgChzG',
            },
          },
        },
      },
    }),
  })
}
