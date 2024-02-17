<template>
  <header class="my-2">
    <Container>
      <div class="navbar bg-base-200 rounded-lg shadow-md">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <Icon name="mdi:menu" size="25px" />
            </div>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content z-[1] mt-3 p-2 shadow bg-neutral-500 rounded-box w-52"
            >
              <HeaderItems />
            </ul>
          </div>
          <NuxtLink to="/" class="btn btn-ghost normal-case text-2xl">
            The Good Land
          </NuxtLink>
        </div>
        <div class="navbar-end">
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
