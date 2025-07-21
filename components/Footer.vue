<script setup lang="ts">
const email = ref('')
const isLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error' | null>(null)

async function subscribe() {
  if (!email.value) {
    showMessage('Please enter your email address', 'error')
    return
  }

  // Basic email validation
  if (!email.value.includes('@') || !email.value.includes('.')) {
    showMessage('Please enter a valid email address', 'error')
    return
  }

  isLoading.value = true
  message.value = ''
  messageType.value = null

  try {
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
                  email: email.value,
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

    showMessage('Successfully subscribed! Thank you for joining our newsletter.', 'success')
    email.value = ''
  }
  catch (error: any) {
    console.error('Subscription error:', error)

    // Handle different error types
    if (error.status === 409) {
      showMessage('You are already subscribed!', 'error')
    }
    else if (error.status === 400) {
      showMessage('Invalid email address. Please check and try again.', 'error')
    }
    else {
      showMessage('Something went wrong. Please try again later.', 'error')
    }
  }
  finally {
    isLoading.value = false
  }
}

function showMessage(text: string, type: 'success' | 'error') {
  message.value = text
  messageType.value = type

  // Clear message after 5 seconds
  setTimeout(() => {
    message.value = ''
    messageType.value = null
  }, 5000)
}
</script>

<template>
  <USeparator class="mt-30 mb-15" />
  <ContainerMedium class="mb-15">
    <div class="flex justify-between flex-col md:flex-row gap-4">
      <div class="flex gap-2 justify-center items-center">
        <LogoIcon class="size-9 fill-accent mr-0.5 bg-neutral-700 p-1.5 rounded-md" />
        <h3 class="normal-case font-semibold text-2xl flex justify-center">
          The Good Land
        </h3>
      </div>
      <div class="flex flex-col gap-2 justify-center">
        <div class="text-sm font-medium text-toned">
          Sign up to receive our newsletter.
        </div>
        <div class="flex gap-2 justify-center">
          <UInput
            v-model="email" leading-icon="i-lucide-at-sign" placeholder="Email" class="md:min-w-72"
            :disabled="isLoading" @keyup.enter="subscribe"
          />
          <UButton variant="soft" :loading="isLoading" :disabled="isLoading" @click="subscribe">
            Subscribe
          </UButton>
        </div>

        <!-- Success/Error Message -->
        <div v-if="message" class="text-center text-sm">
          <p
            :class="{
              'text-green-600': messageType === 'success',
              'text-red-600': messageType === 'error',
            }"
          >
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </ContainerMedium>
</template>
