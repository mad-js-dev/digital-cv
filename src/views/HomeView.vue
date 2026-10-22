<template>
  <div class="flex items-center justify-center min-h-screen text-center p-10">
    <div class="max-w-2xl">
      <h1 class="text-6xl font-bold mb-6 text-[var(--color-text-primary)]">Welcome to my Digital Space</h1>
      <p class="text-xl text-[var(--color-text-secondary)] mb-10">Exploring the intersection of design and engineering.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link to="/cv" class="px-8 py-3 bg-[var(--color-accent)] text-white rounded-full font-bold hover:scale-105 transition-transform inline-block">
          View My CV
        </router-link>
        <router-link to="/scale" class="px-8 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-full font-bold hover:scale-105 transition-transform inline-block">
          Radius Scale
        </router-link>
      </div>
    </div>
  </div>
</template>
