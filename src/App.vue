<template>
  <div class="font-sans text-[#6f8194] flex flex-col max-w-xl mx-auto">
    
    <nav class="py-5 mb-5 border-b-2 border-[#4d4d4d] text-center space-x-4 mx-5">
      <router-link
        to="/assets"
        class="font-bold text-[1.1em]"
        :class="isActive('/assets') ? 'text-[#49ca90]' : 'text-[#e3e3e3]'"
      >
        Asset
      </router-link>

      <router-link
        to="/reports"
        class="font-bold text-[1.1em]"
        :class="isActive('/reports') ? 'text-[#49ca90]' : 'text-[#e3e3e3]'"
      >
        Report
      </router-link>

      <router-link
        to="/settings"
        class="font-bold text-[1.1em]"
        :class="isActive('/settings') ? 'text-[#49ca90]' : 'text-[#e3e3e3]'"
      >
        Setting
      </router-link>
    </nav>

    <main class="flex-1 px-5">
      <router-view />
    </main>

    <footer class="text-center py-5 mt-10 border-t border-[#eee] text-[#666] mx-5">
      KantongCuan &copy; hq.han 2025
    </footer>

  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => route.path === path
</script>