<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const form = useTemplateRef<HTMLFormElement>('form')
const toast = useToast()

const subscriptionSchema = z.object({
  email: z.string().email('Invalid email'),
})

type SubscriptionSchema = z.output<typeof subscriptionSchema>

const subscriptionFormState = reactive<Partial<SubscriptionSchema>>({
  email: undefined,
})

async function submitSubscriptionForm(event: FormSubmitEvent<SubscriptionSchema>) {
  try {
    await useSubscribeToNewsletter(event.data.email)
    toast.add({
      title: 'Thanks for signing up!',
      description: 'You are now subscribed to our newsletter.',
      color: 'success',
    })
    subscriptionFormState.email = undefined
  }
  catch (error: any) {
    console.error('Subscription error:', error)

    form.value?.setErrors([
      {
        name: 'email',
        message: 'Failed to subscribe. Please try again.',
      },
    ])
  }
}
</script>

<template>
  <USeparator class="mt-20 mb-12" />
  <ContainerMedium class="mb-12">
    <div class="flex justify-between flex-col md:flex-row gap-12">
      <div class="flex flex-col gap-3 items-center">
        <div class="flex gap-3">
          <LogoIcon class="size-9 fill-accent mr-0.5 bg-neutral-700 p-1.5 rounded-md mt-1" />
          <div>
            <h3 class="font-medium text-base flex justify-center max-w-72">
              Literature that highlights the richness of life found in Jesus Christ.
            </h3>
            <div class="text-sm mt-2 leading-tight text-toned">
              Christ, our Good Land.
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 h-24 items-center">
        <div class="w-fit">
          <div class="text-sm text-medium text-toned text-left mb-2">
            Sign up to receive our newsletter.
          </div>
          <UForm
            ref="form" :schema="subscriptionSchema" :state="subscriptionFormState"
            class="flex gap-2 justify-center" @submit="submitSubscriptionForm"
          >
            <UFormField name="email">
              <UInput
                v-model="subscriptionFormState.email" leading-icon="ph:at-duotone" placeholder="Email"
                class="min-w-60 md:min-w-80"
              />
            </UFormField>
            <div>
              <UButton variant="soft" type="submit">
                Subscribe
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </ContainerMedium>
</template>
