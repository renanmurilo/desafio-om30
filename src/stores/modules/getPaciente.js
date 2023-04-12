import { defineStore } from 'pinia';
import { useRoute } from 'vue-router'

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useRouter = () => {
  const route = useRoute();
  return {
    route,
  };
};

export const useUsersStore = defineStore({
    id: 'user',
    state: () => ({
        user: {}
    }),
    actions: {
        async getAll() {
            // const route = useRoute();
            const { route } = useRouter();
            this.users = { loading: true };
            fetchWrapper.get(`${baseUrl}rest/collections/Pacientes/${route.params.id}`)
                .then(users => this.user = users.data)
                .catch(error => this.user = { error })
                console.log(this.user);
        }
    }
});
