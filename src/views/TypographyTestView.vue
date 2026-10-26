<template>
  <div class="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center gap-12">
    <h1 class="text-3xl font-bold">Typography System</h1>
    <p class="text-slate-400 max-w-2xl text-center">
      Full implementation of Material 3 Typography. This gallery showcases the type scale, 
      editorial treatments, and the flexible token-based system.
    </p>

    <div class="w-full max-w-6xl space-y-16">
      <!-- 1. THE TYPE SCALE MATRIX -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Type Scale Matrix</h2>
        <div class="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-800/50 text-slate-300 text-xs uppercase tracking-wider">
              <tr>
                <th class="p-4 border-b border-slate-700/50">Role</th>
                <th class="p-4 border-b border-slate-700/50">Size</th>
                <th class="p-4 border-b border-slate-700/50">Token</th>
                <th class="p-4 border-b border-slate-700/50">Visual Sample</th>
              </tr>
            </thead>
            <tbody class="text-slate-400">
              <template v-for="role in roles" :key="role">
                <tr v-for="size in sizeLabels" :key="`${role}-${size}`" 
                    class="border-b border-slate-700/30 last:border-0 hover:bg-slate-700/10 transition-colors">
                  <td class="p-4 align-top font-medium text-slate-500">{{ role }}</td>
                  <td class="p-4 align-top text-xs">{{ size }}</td>
                  <td class="p-4 align-top font-mono text-[10px] text-accent">{{ `${role}-${size.toLowerCase()}` }}</td>
                  <td class="p-4 align-middle">
                    <Typography :variant="(`${role}-${size.toLowerCase()}` as any)" color="white">
                      The quick brown fox jumps over the lazy dog.
                    </Typography>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. EDITORIAL TREATMENTS -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">Editorial Treatments</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-800/30 rounded-3xl border border-slate-700/50">
          
          <div class="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-xl border border-slate-700/30">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Uppercase (Label Small)</span>
            <Typography variant="label-small" treatment="uppercase" color="accent">
              Action Required
            </Typography>
          </div>

          <div class="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-xl border border-slate-700/30">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Capitalize (Title Medium)</span>
            <Typography variant="title-medium" treatment="capitalize">
              welcome to the system
            </Typography>
          </div>

          <div class="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-xl border border-slate-700/30">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Weight Override (Body Large)</span>
            <Typography variant="body-large" :weight="700">
              This text is forced to Bold (700).
            </Typography>
          </div>

          <div class="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-xl border border-slate-700/30">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Custom Style Object</span>
            <Typography :variant="{ size: 40, weight: 800, lineHeight: 48, letterSpacing: -1 }" color="white">
              Custom Giant
            </Typography>
          </div>
        </div>
      </section>

      <!-- 3. SYSTEM COMPARISON -->
      <section class="flex flex-col gap-6">
        <h2 class="text-sm text-slate-400 uppercase tracking-widest text-left">System Comparison</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-800/30 rounded-3xl border border-slate-700/50">
          
          <div class="flex flex-col gap-4 p-6 bg-red-900/10 rounded-xl border border-red-700/30">
            <span class="text-[10px] font-mono text-red-400 uppercase">Wrong: Using Body for Heading</span>
            <Typography variant="body-large" class="text-white">
              This is a Section Heading
            </Typography>
            <p class="text-sm text-slate-500">Lacks the necessary visual weight and hierarchy.</p>
          </div>

          <div class="flex flex-col gap-4 p-6 bg-green-900/10 rounded-xl border border-green-700/30">
            <span class="text-[10px] font-mono text-green-400 uppercase">Right: Using Headline Small</span>
            <Typography variant="headline-small" class="text-white">
              This is a Section Heading
            </Typography>
            <p class="text-sm text-slate-500">Properly anchored in the M3 hierarchy.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typography from '@/components/atoms/Typography/Typography.vue';

const roles = ['display', 'headline', 'title', 'body', 'label'];
const sizeLabels = ['Large', 'Medium', 'Small'];
</script>
