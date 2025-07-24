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
        <div class="flex gap-2 items-center">
          <LogoIcon class="size-9 fill-accent mr-0.5 bg-neutral-700 p-1.5 rounded-md" />
          <h3 class="font-semibold text-2xl flex justify-center">
            The Good Land
          </h3>
        </div>
        <div class="text-base leading-tight font-semibold text-toned text-center">
          Christ, our Good Land.
        </div>
      </div>

      <div class="flex flex-col gap-2 h-24">
        <div class="text-sm text-medium text-toned text-center md:text-left">
          Sign up to receive our newsletter.
        </div>
        <UForm
          ref="form" :schema="subscriptionSchema" :state="subscriptionFormState" class="flex gap-2 justify-center"
          @submit="submitSubscriptionForm"
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
  </ContainerMedium>
</template>
