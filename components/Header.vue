<template>
  <header class="my-2">
    <Container>
      <div class="navbar bg-base-300 rounded-lg shadow-md justify-between">
        <div class="navbar-start">
          <NuxtLink to="/" class="btn btn-ghost normal-case text-2xl flex justify-center hover:bg-neutral-700">
            <LogoIcon class="size-9 fill-accent mr-0.5 bg-neutral-700 p-1.5 rounded-md" />
            The Good Land
          </NuxtLink>
        </div>
        <div class="navbar-end w-fit">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <Icon name="mdi:menu" size="25px" />
            </div>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content z-[1] mt-3 p-2 shadow bg-neutral-900 rounded-box w-52"
            >
              <HeaderItems />
            </ul>
          </div>
          <Search />
          <div class="hidden lg:flex">
            <ul class="menu menu-horizontal px-1 gap-1">
              <HeaderItems />
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </header>
</template>
