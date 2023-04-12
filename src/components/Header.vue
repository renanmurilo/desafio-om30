<script setup>
import { RouterLink, RouterView } from 'vue-router';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <header class="shell">
        <nav v-show="authStore.user">
            <div class="navbar-nav">
                <router-link to="/pacientes" class="nav-item">
                    Pacientes
                </router-link>

                <router-link to="/cadastro" class="nav-item">
                    Cadastro
                </router-link>

                <a @click="authStore.logout()" class="nav-item nav-link">
                    Logout
                </a>
            </div>
        </nav>
    </header>
</template>

<style lang="scss">
header {
    nav {
        border-radius: 0.75rem;
        background-color: $background;
        padding: 1rem;
        max-width: 70%;
        margin: 2rem auto;

        .nav-item {
            @include font-roboto(1rem, 400);
            color: $primary;
            margin-right: 1rem;
            text-transform: capitalize;
            letter-spacing: 0.1rem;

            &.active {
                font-weight: 700;
            }
        }
    }
}
</style>