<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
    <div class="app-container bg-light">
        <Header />

        <div class="container pt-4 pb-4">
            <RouterView />
        </div>
    </div>
</template>